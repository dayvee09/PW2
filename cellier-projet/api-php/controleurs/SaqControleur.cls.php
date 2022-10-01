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
