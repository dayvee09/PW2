<?php

/**
 * Class Modele
 * Template de classe modèle. Dupliquer et modifier pour votre usage.
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2019-01-21
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 * 
 */
class Cellier extends Modele
{

    protected $_db;
    function __construct()
    {
        $this->_db = MonSQL::getInstance();
    }

    public function getListeBouteilleCellier()
    {

        $rows = array();
        $requete = 'SELECT 
						c.id as id_bouteille_cellier,
						b.date_achat, 
						b.garde_jusqua, 
						b.notes, 
						b.prix_saq, 
						b.quantite,
						b.millesime, 
						b.id,
						b.nom, 
						b.vino__type_id, 
						b.image, 
						b.code_saq, 
						b.url_saq, 
						b.pays, 
						b.description,
						t.type 
						from vino__cellier c 
						INNER JOIN vino__bouteille b ON c.id = b.id
						INNER JOIN vino__type t ON t.id = b.vino__type_id
						';
        if (($res = $this->_db->query($requete)) ==     true) {
            if ($res->num_rows) {
                while ($row = $res->fetch_assoc()) {
                    $row['nom'] = trim(utf8_encode($row['nom']));
                    $rows[] = $row;
                }
            }
        } else {
            throw new Exception("Erreur de requête sur la base de donnée", 1);
            //$this->_db->error;
        }



        return $rows;
    }

    function __destruct()
    {
    }
}
