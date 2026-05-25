<<<<<<< HEAD
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
=======
<?php

/**
 * Class MonSQL
 * Classe qui génère ma connection à MySQL à travers un singleton
 */
class SaqControleur extends Controleur
{

    const DUPLICATION = 'duplication';
    const ERREURDB = 'erreurdb';
    const INSERE = 'Nouvelle bouteille insérée';


    private static $_webpage;
    private static $_status;
    private $stmt;

    //IMPORTER DE LA SAQ
    public function ajouter($donneesSaq)
    {

        $body = json_decode($donneesSaq);

        for ($i = 0; $i < 1; $i++)    //permet d'importer séquentiellement plusieurs pages.
        {
            $nombre = $this->getProduits($body->nombre, $body->page + $i, $body->type);
        }
    }

    /**
     * Web scraper pour prendre toutes les bouteilles à importer
     * @param int $nombre
     * @param int $debut
     */
    public function getProduits($nombre, $page, $type = "rouge")
    {
        $s = curl_init();
        //$url = "https://www.saq.com/fr/produits/vin/vin-rouge?p=1&product_list_limit=24&product_list_order=name_asc";
        $url = "https://www.saq.com/fr/produits/vin/vin-$type?p=" . $page . "&product_list_limit=" . $nombre . "&product_list_order=name_asc";
        //curl_setopt($s, CURLOPT_URL, "http://www.saq.com/webapp/wcs/stores/servlet/SearchDisplay?searchType=&orderBy=&categoryIdentifier=06&showOnly=product&langId=-2&beginIndex=".$debut."&tri=&metaData=YWRpX2YxOjA8TVRAU1A%2BYWRpX2Y5OjE%3D&pageSize=". $nombre ."&catalogId=50000&searchTerm=*&sensTri=&pageView=&facet=&categoryId=39919&storeId=20002");
        //curl_setopt($s, CURLOPT_URL, "http://www.saq.com/webapp/wcs/stores/servlet/SearchDisplay?searchType=&orderBy=&categoryIdentifier=06&showOnly=product&langId=-2&beginIndex=".$debut."&tri=&metaData=YWRpX2YxOjA8TVRAU1A%2BYWRpX2Y5OjE%3D&pageSize=". $nombre ."&catalogId=50000&searchTerm=*&sensTri=&pageView=&facet=&categoryId=39919&storeId=20002");
        //curl_setopt($s, CURLOPT_URL, "https://www.saq.com/webapp/wcs/stores/servlet/SearchDisplay?categoryIdentifier=06&showOnly=product&langId=-2&beginIndex=" . $debut . "&pageSize=" . $nombre . "&catalogId=50000&searchTerm=*&categoryId=39919&storeId=20002");
        //curl_setopt($s, CURLOPT_URL, $url);
        //curl_setopt($s, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($s, CURLOPT_CUSTOMREQUEST, 'GET');
        //curl_setopt($s, CURLOPT_NOBODY, false);
        //curl_setopt($s, CURLOPT_FOLLOWLOCATION, 1);

        // Se prendre pour un navigateur pour berner le serveur de la saq...
        curl_setopt_array($s, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
            CURLOPT_ENCODING => 'gzip, deflate',
            CURLOPT_HTTPHEADER => array(
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language: en-US,en;q=0.5',
                'Accept-Encoding: gzip, deflate',
                'Connection: keep-alive',
                'Upgrade-Insecure-Requests: 1',
            ),
        ));

        self::$_webpage = curl_exec($s);
        self::$_status = curl_getinfo($s, CURLINFO_HTTP_CODE);
        curl_close($s);

        $doc = new DOMDocument();
        $doc->recover = true;
        $doc->strictErrorChecking = false;
        @$doc->loadHTML(self::$_webpage);
        $elResults = $doc->getElementById("toolbar-amount");
        $nbResults = intVal($elResults->getElementsByTagName("span")->item(2)->textContent);
        $elements = $doc->getElementsByTagName("li");
        $i = 0;
        foreach ($elements as $key => $noeud) {
            //var_dump($noeud -> getAttribute('class')) ;
            //if ("resultats_product" == str$noeud -> getAttribute('class')) {
            if (strpos($noeud->getAttribute('class'), "product-item") !== false) {

                $info = self::recupereInfo($noeud);
                $retour = $this->ajouteProduit($info);
                if ($retour->succes == false) {
                } else {
                    $i++;
                }
            }
        }

        return $i;
    }

    /**
     * Prendre les contenu des nodes HTML et le sauvegarder 
     *
     * @param  mixed $node
     * @return void
     */
    private function get_inner_html($node)
    {
        $innerHTML = '';
        $children = $node->childNodes;
        foreach ($children as $child) {
            $innerHTML .= $child->ownerDocument->saveXML($child);
        }

        return $innerHTML;
    }
    /**
     * Nettoyer l'espace de la chaine de caractère
     *
     * @param  mixed $chaine
     */
    private function nettoyerEspace($chaine)
    {
        return preg_replace('/\s+/', ' ', $chaine);
    }

    /**
     * Récupérer tous les informations associées à des bouteilles de la SAQ 
     *
     * @param  mixed $noeud
     * @return void
     */
    private function recupereInfo($noeud)
    {
        $info = new stdClass();
        if (strpos($noeud->getElementsByTagName("img")->item(0)->getAttribute('src'), "pastille") !== false) {
            $info->img = $noeud->getElementsByTagName("img")->item(1)->getAttribute('src');
        } else {
            $info->img = $noeud->getElementsByTagName("img")->item(0)->getAttribute('src');
        }
            //TODO : Nettoyer le lien
        ;
        $a_titre = $noeud->getElementsByTagName("a")->item(0);
        $info->url = $a_titre->getAttribute('href');

        //var_dump($noeud -> getElementsByTagName("a")->item(1)->textContent);
        $nom = $noeud->getElementsByTagName("a")->item(1)->textContent;
        // $note = trim($noeud->getElementsByTagName("a")->item(2)->textContent);
        // $nbEval = $noeud->getElementsByTagName("a")->item(3)->textContent;
        // $nbEval = str_replace(array('(', ')'), '', $nbEval);
        // $info->note = $note;
        // $info->nbEval = $nbEval;
        //var_dump($a_titre);
        $info->nom = self::nettoyerEspace(trim($nom));
        //var_dump($info -> nom);
        // Type, format et pays
        $aElements = $noeud->getElementsByTagName("strong");
        foreach ($aElements as $node) {
            if ($node->getAttribute('class') == 'product product-item-identity-format') {
                $info->desc = new stdClass();
                $info->desc->texte = $node->textContent;
                $info->desc->texte = self::nettoyerEspace($info->desc->texte);
                $aDesc = explode("|", $info->desc->texte); // Type, Format, Pays
                if (count($aDesc) == 3) {

                    $info->desc->type = trim($aDesc[0]);
                    $info->desc->format = trim($aDesc[1]);
                    $info->desc->pays = trim($aDesc[2]);
                }

                $info->desc->texte = trim($info->desc->texte);
            }
        }

        //Code SAQ
        $aElements = $noeud->getElementsByTagName("div");
        foreach ($aElements as $node) {
            if ($node->getAttribute('class') == 'saq-code') {
                if (preg_match("/\d+/", $node->textContent, $aRes)) {
                    $info->desc->code_SAQ = trim($aRes[0]);
                }
            }
        }

        $aElements = $noeud->getElementsByTagName("span");
        foreach ($aElements as $node) {
            if ($node->getAttribute('class') == 'price') {
                $prix = trim($node->textContent);
                $prix = str_replace(',', '.', $prix);
                $prix = trim(str_replace('$', '', $prix));
                $info->prix = $prix;
            }
        }
        return $info;
    }

    /**
     * Ajouter les bouteilles importées dans la base de donnée 
     *
     * @param  mixed $bte
     */
    private function ajouteProduit($bte)
    {
        $_db = new AccesBd;
        $retour = new stdClass();
        $retour->succes = false;
        $retour->raison = '';

        // Récupère le type
        $rows = $this->modele->un($bte->desc->type);
        $type_id = $rows->id;
        if (count((array)$rows) == 1) {
            $rows = $this->modele->un($bte->desc->code_SAQ);
            if ($rows === false) {
                $this->reponse['entete_statut'] = 'HTTP/1.1 201 Created';
                $this->reponse['corps'] = ['id' => $this->modele->ajouter($bte, $type_id)];
            } else {
                $retour->succes = false;
                $retour->raison = self::DUPLICATION;
            }
        } else {
            $retour->succes = false;
            $retour->raison = self::ERREURDB;
        }
        return $retour;
    }

    /**
     * Récupérer tous les bouteilles importées de la SAQ par le type du vin - Méthod 'GET'
     *
     * @param  mixed $type
     */
    public function tout($type)
    {
        $type = $type["admin"];
        $s = curl_init();
        $url = "https://www.saq.com/fr/produits/vin/vin-$type?p=1&product_list_limit=96&product_list_order=name_asc";
        curl_setopt_array($s, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
            CURLOPT_ENCODING => 'gzip, deflate',
            CURLOPT_HTTPHEADER => array(
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language: en-US,en;q=0.5',
                'Accept-Encoding: gzip, deflate',
                'Connection: keep-alive',
                'Upgrade-Insecure-Requests: 1',
            ),
        ));

        self::$_webpage = curl_exec($s);
        self::$_status = curl_getinfo($s, CURLINFO_HTTP_CODE);
        curl_close($s);

        $doc = new DOMDocument();
        $doc->recover = true;
        $doc->strictErrorChecking = false;
        @$doc->loadHTML(self::$_webpage);
        $elResults = $doc->getElementById("toolbar-amount");
        $nbResults = intVal($elResults->getElementsByTagName("span")->item(2)->textContent);
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $nbResults;
    }

    /**
     * Récupérer un un enregistrement spécifié - Méthod 'GET'
     *
     * @param  mixed $params
     * @param  mixed $idEntite
     */
    public function un($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->un($params, $idEntite);
    }

    /**
     * Modifier un enregistrement spécifié - Méthod 'PUT'
     *
     * @param  mixed $id
     * @param  mixed $cellier
     * @return void
     */
    public function remplacer($id, $cellier)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->remplacer($id, json_decode($cellier));
    }

    /**
     * Modifier un enregistrement spécifié - Méthod 'PATCH'
     *
     * @param  mixed $params
     * @param  mixed $idEntite
     * @param  mixed $fragmentEntite
     * @return void
     */
    public function changer($params, $idEntite, $fragmentEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->changer($params, $idEntite, json_decode($fragmentEntite));
    }

    /**
     * Supprimer un enregistrement spécifié - Méthod 'DELETE'
     *
     * @param  mixed $params
     * @param  mixed $idEntite
     * @return void
     */
    public function retirer($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = ['nombre' => $this->modele->retirer($params, $idEntite)];
    }
}
>>>>>>> monvino/master
