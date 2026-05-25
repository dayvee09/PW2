<?php

/**
 * Contrôleur pour l'importation des bouteilles depuis la SAQ (via GraphQL Magento).
 */
class SaqControleur extends Controleur
{

    const DUPLICATION = 'duplication';
    const ERREURDB = 'erreurdb';
    const INSERE = 'Nouvelle bouteille insérée';

    private const SAQ_GRAPHQL_URL = 'https://www.saq.com/graphql';
    private const SAQ_BASE_URL = 'https://www.saq.com/fr/';
    /** Tranches de prix pour contourner la limite Magento (currentPage * pageSize ≤ 10 000). */
    private const TRANCHES_PRIX = [
        ['from' => '0', 'to' => '15'],
        ['from' => '15', 'to' => '25'],
        ['from' => '25', 'to' => '40'],
        ['from' => '40', 'to' => '60'],
        ['from' => '60', 'to' => '100'],
        ['from' => '100', 'to' => '99999'],
    ];

  private static $_webpage;
    private static $_status;
    private $stmt;

    private function categoryPathForType($type)
    {
        $paths = [
            'rouge' => 'produits/vin/vin-rouge',
            'blanc' => 'produits/vin/vin-blanc',
            'rose' => 'produits/vin/vin-rose',
        ];

        return $paths[$type] ?? $paths['rouge'];
    }

    private function fetchGraphQL($query)
    {
        if (!function_exists('curl_init')) {
            throw new RuntimeException('L\'extension PHP curl est requise pour la synchronisation SAQ (paquet php-curl).');
        }

        $payload = json_encode(['query' => $query]);
        $s = curl_init();
        curl_setopt_array($s, [
            CURLOPT_URL => self::SAQ_GRAPHQL_URL,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Accept: application/json',
            ],
            CURLOPT_TIMEOUT => 60,
        ]);

        $response = curl_exec($s);
        $status = curl_getinfo($s, CURLINFO_HTTP_CODE);
        curl_close($s);

        if ($response === false || $status < 200 || $status >= 300) {
            throw new RuntimeException('Impossible de contacter le service SAQ (HTTP ' . $status . ').');
        }

        $data = json_decode($response);
        if (!$data || isset($data->errors)) {
            $message = isset($data->errors[0]->message) ? $data->errors[0]->message : 'Réponse SAQ invalide.';
            throw new RuntimeException($message);
        }

        return $data;
    }

    private function truncate($value, $maxLength)
    {
        $value = trim((string) $value);
        if ($value === '') {
            return $value;
        }
        if (function_exists('mb_substr')) {
            return mb_substr($value, 0, $maxLength);
        }
        return substr($value, 0, $maxLength);
    }

    private function imageUrl($attrs, $item)
    {
        if (!empty($attrs['image'])) {
            return 'https://www.saq.com/media/catalog/product' . $attrs['image'];
        }
        $url = $item->small_image->url ?? '';
        if ($url !== '' && strpos($url, '?') !== false) {
            $url = strtok($url, '?');
        }
        return $url;
    }

    private function attributeMap($customAttributes)
    {
        $map = [];
        if (!$customAttributes || !isset($customAttributes->items)) {
            return $map;
        }

        foreach ($customAttributes->items as $item) {
            if (isset($item->value)) {
                $map[$item->code] = $item->value;
            } elseif (isset($item->selected_options[0]->label)) {
                $map[$item->code] = trim($item->selected_options[0]->label);
            }
        }

        return $map;
    }

    private function productFromGraphQL($item)
    {
        $attrs = $this->attributeMap($item->custom_attributesV2 ?? null);

        $info = new stdClass();
        $info->img = $this->truncate($this->imageUrl($attrs, $item), 200);
        $info->url = $this->truncate(self::SAQ_BASE_URL . ($item->url_key ?? $item->sku), 200);
        $info->nom = $this->truncate($item->name ?? '', 200);
        $info->prix = $item->price_range->minimum_price->final_price->value ?? 0;

        $info->desc = new stdClass();
        $info->desc->type = $attrs['identite_produit'] ?? 'Vin rouge';
        $format = $attrs['format_contenant_ml'] ?? '';
        $info->desc->format = $this->truncate($format !== '' ? $format . ' ml' : '', 45);
        $info->desc->pays = $this->truncate($attrs['pays_origine'] ?? '', 45);
        $info->desc->code_SAQ = $this->truncate($item->sku ?? '', 45);
        $description = $attrs['meta_description'] ?? '';
        if ($description === '') {
            $description = trim($info->desc->type . ' | ' . $info->desc->format . ' | ' . $info->desc->pays);
        }
        $info->desc->texte = $this->truncate($description, 200);

        return $info;
    }

    private function prixFilterGraphQL($prixMin, $prixMax)
    {
        if ($prixMin === null || $prixMax === null) {
            return '';
        }

        return ', price: { from: "' . $prixMin . '", to: "' . $prixMax . '" }';
    }

    private function fetchProductsPage($type, $page, $pageSize, $includeItems = true, $prixMin = null, $prixMax = null)
    {
        $categoryPath = $this->categoryPathForType($type);
        $itemsSelection = $includeItems
            ? 'items {
                sku
                name
                url_key
                price_range { minimum_price { final_price { value } } }
                small_image { url }
                custom_attributesV2 {
                    items {
                        code
                        ... on AttributeValue { value }
                        ... on AttributeSelectedOptions { selected_options { label } }
                    }
                }
            }'
            : '';

        $query = '{ products(filter: { category_url_path: { eq: "' . $categoryPath . '" }'
            . $this->prixFilterGraphQL($prixMin, $prixMax) . ' }, pageSize: '
            . intval($pageSize) . ', currentPage: ' . intval($page) . ') { total_count ' . $itemsSelection . ' } }';
        $query = preg_replace('/\s+/', ' ', trim($query));

        $data = $this->fetchGraphQL($query);
        return $data->data->products ?? null;
    }

    /**
     * Découpe un type de vin en tranches de prix pour contourner la limite de pagination Magento.
     */
    private function tranchesPrixPourType($type)
    {
        $tranches = [];

        foreach (self::TRANCHES_PRIX as $tranche) {
            $products = $this->fetchProductsPage($type, 1, 1, false, $tranche['from'], $tranche['to']);
            $total = isset($products->total_count) ? intval($products->total_count) : 0;
            if ($total > 0) {
                $tranches[] = [
                    'prixMin' => $tranche['from'],
                    'prixMax' => $tranche['to'],
                    'total' => $total,
                ];
            }
        }

        return $tranches;
    }

    private function typeParCategorie($type)
    {
        $types = [
            'rouge' => 'Vin rouge',
            'blanc' => 'Vin blanc',
            'rose' => 'Vin rosé',
        ];

        return $types[$type] ?? 'Vin rouge';
    }

    //IMPORTER DE LA SAQ
    public function ajouter($donneesSaq)
    {
        try {
            $body = json_decode($donneesSaq);
            $prixMin = isset($body->prixMin) ? (string) $body->prixMin : null;
            $prixMax = isset($body->prixMax) ? (string) $body->prixMax : null;
            $this->getProduits($body->nombre, $body->page + 0, $body->type, $prixMin, $prixMax);
            $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
            $this->reponse['corps'] = ['succes' => true];
        } catch (Throwable $e) {
            $this->reponse['entete_statut'] = 'HTTP/1.1 500 Internal Server Error';
            $this->reponse['corps'] = ['erreur' => $e->getMessage()];
        }
    }

    /**
     * Importer les bouteilles d'une page via l'API GraphQL de la SAQ.
     */
    public function getProduits($nombre, $page, $type = "rouge", $prixMin = null, $prixMax = null)
    {
        $products = $this->fetchProductsPage($type, $page + 1, $nombre, true, $prixMin, $prixMax);
        if (!$products || !isset($products->items)) {
            return 0;
        }

        $typeFallback = $this->typeParCategorie($type);
        $i = 0;
        foreach ($products->items as $item) {
            if (!$item || !isset($item->sku)) {
                continue;
            }

            $info = $this->productFromGraphQL($item);
            $retour = $this->ajouteProduit($info, $typeFallback);
            if ($retour->succes) {
                $i++;
            }
        }

        return $i;
    }

    /**
     * Ajouter les bouteilles importées dans la base de donnée
     */
    private function normaliserTypeVin($type)
    {
        $aliases = [
            'Vin rose' => 'Vin rosé',
        ];

        return $aliases[$type] ?? $type;
    }

    private function ajouteProduit($bte, $typeFallback = null)
    {
        $retour = new stdClass();
        $retour->succes = false;
        $retour->raison = '';

        $typeNom = $this->normaliserTypeVin($bte->desc->type ?? $typeFallback ?? '');
        if ($typeNom === '') {
            $retour->raison = self::ERREURDB;
            return $retour;
        }

        $rows = $this->modele->un($typeNom);
        if (!$rows || !isset($rows->id)) {
            $retour->raison = self::ERREURDB;
            return $retour;
        }

        $type_id = $rows->id;
        $rows = $this->modele->un($bte->desc->code_SAQ);
        if ($rows === false) {
            try {
                $this->modele->ajouter($bte, $type_id);
                $retour->succes = true;
                $retour->raison = self::INSERE;
            } catch (Throwable $e) {
                $retour->raison = $e->getMessage();
            }
        } else {
            $retour->raison = self::DUPLICATION;
        }

        return $retour;
    }

    /**
     * Récupérer le nombre de bouteilles par type de vin - Méthod 'GET'
     */
    public function tout($type)
    {
        try {
            $wineType = $type["admin"];
            $products = $this->fetchProductsPage($wineType, 1, 1, false);
            $nbResults = isset($products->total_count) ? intval($products->total_count) : 0;
            $tranches = $this->tranchesPrixPourType($wineType);
            $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
            $this->reponse['corps'] = [
                'total' => $nbResults,
                'tranches' => $tranches,
            ];
        } catch (Throwable $e) {
            $this->reponse['entete_statut'] = 'HTTP/1.1 500 Internal Server Error';
            $this->reponse['corps'] = ['erreur' => $e->getMessage()];
        }
    }

    public function un($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->un($params, $idEntite);
    }

    public function remplacer($id, $cellier)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->remplacer($id, json_decode($cellier));
    }

    public function changer($params, $idEntite, $fragmentEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->changer($params, $idEntite, json_decode($fragmentEntite));
    }

    public function retirer($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = ['nombre' => $this->modele->retirer($params, $idEntite)];
    }
}
