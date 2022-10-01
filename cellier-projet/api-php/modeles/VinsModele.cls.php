<?php
class VinsModele extends AccesBd
{    
    /**
     * Récupérer toutes les bouteilles dans un cellier spécifié 
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return array Tableau associatif contenant des tableaux des données
     */
    public function tout($params)
    {
        return $this->lire("SELECT  vino__cellier.vino__utilisateur_id, vino__bouteille.id, vino__bouteille.nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, vino__type.type, millesime,personnalise, vino__cellier_id, quantite, date_achat, garde_jusqua, notes FROM vino__bouteille JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id=vino__bouteille_has_vino__cellier.vino__bouteille_id JOIN vino__type ON vino__bouteille.vino__type_id=vino__type.id JOIN vino__cellier ON vino__cellier.id =vino__bouteille_has_vino__cellier.vino__cellier_id where vino__bouteille_has_vino__cellier.vino__cellier_id =:cellier ORDER BY vino__bouteille.id ASC", ['cellier' => $params['cellier']]);
    }
    
    /**
     * Récupérer une bouteille spécifié dans un cellier spécifié 
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @param  array $idEntite Tableau associatif des paramètres de la requête
     * @return array Tableau associatif ayant seulement un entregistrement cherché
     */
    public function un($params, $idEntite)
    {
        return $this->lireUn("SELECT nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, millesime,personnalise, vino__cellier_id, quantite, date_achat, garde_jusqua, notes FROM vino__bouteille JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id=vino__bouteille_has_vino__cellier.vino__bouteille_id WHERE vino__cellier_id = :cellier_id AND vino__bouteille_has_vino__cellier.vino__bouteille_id = :vin_id", ['vin_id' => $idEntite["bouteille"], 'cellier_id' => $params["cellier"]]);
    }
    
    /**
     * Ajouter une nouvelle bouteille soit importer soit créer (non listée) 
     *
     * @param  mixed $vin Payload du corps du message HTTP en format JSON
     * @return int Identifiant (auto increment) du dernier enregistrement inséré
     */
    public function ajouter($vin)
    {
        if ($vin->personnalise == 1) {
            $nouveau_id = $this->creer("INSERT INTO vino__bouteille (nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, millesime,personnalise) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [$vin->nom, $vin->image, $vin->code_saq, $vin->pays, $vin->description, $vin->prix_saq, $vin->url_saq, $vin->url_img, $vin->format, $vin->vino__type_id, $vin->millesime, $vin->personnalise]);
            $this->creer("INSERT INTO `vino__bouteille_has_vino__cellier` (`vino__bouteille_id`, `vino__cellier_id`, `quantite`, `date_achat`, `garde_jusqua`, `notes`) VALUES
            (?, ?, ?, ?, ?, ?)", [$nouveau_id, $vin->vino__cellier_id, $vin->quantite, $vin->date_achat, $vin->garde_jusqua, $vin->notes]);
            return $nouveau_id;
        }

        return $this->creer("INSERT INTO `vino__bouteille_has_vino__cellier` (`vino__bouteille_id`, `vino__cellier_id`, `quantite`, `date_achat`, `garde_jusqua`, `notes`) VALUES
        (?, ?, ?, ?, ?, ?)", [$vin->vino__bouteille_id, $vin->vino__cellier_id, $vin->quantite, $vin->date_achat, $vin->garde_jusqua, $vin->notes]);
    }
    
    /**
     * supprimer une bouteille spécifié dans un cellier spécifié
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @param  array $idEntite $Tableau associatif des paramètres de la requête
     * @return int Nombre d'enregistrement affecté
     */
    public function retirer($params, $idEntite)
    {
        return $this->supprimer("DELETE FROM vino__bouteille_has_vino__cellier WHERE vino__bouteille_has_vino__cellier.	
        vino__bouteille_id=:vin_id AND vino__bouteille_has_vino__cellier.	
        vino__cellier_id=:cellier_id", ['vin_id' => $params["supprimer"], 'cellier_id' => $idEntite["cellier"]]);
    }
    
    /**
     * Modifier tous les champs d'un enregistrement
     * 
     * Gère la modification de l'ensemble des colonnes pour une bouteille donnée. Dans le cas * d'une bouteille créée par un utilisateur, le paramètre admin est a false. Pour une 
     * bouteille provenant de la Saq, le paramètre admin doit être à true (condition if)
     * 
     * @param  int $id L'identifant de la bouteille spécifié
     * @param  mixed $vin Payload du corps du message HTTP en format JSON
     * @return int Nombre d'enregistrement affecté
     */
    public function remplacer($id, $vin)
    {
        $this->modifier("UPDATE vino__bouteille_has_vino__cellier SET 	
        quantite=?, date_achat=?, garde_jusqua=?, notes=? WHERE vino__bouteille_id=?", [
            $vin->quantite,
            $vin->date_achat,
            $vin->garde_jusqua,
            $vin->notes,
            $id
        ]);
        return $this->modifier("UPDATE vino__bouteille SET nom=?, `image`=?, code_saq=?, pays=?, `description`=?, prix_saq=?,url_saq=?,url_img=?, `format`=?, millesime=?, personnalise=? WHERE id=?", [
            $vin->nom,
            $vin->image,
            $vin->code_saq,
            $vin->pays,
            $vin->description,
            $vin->prix_saq,
            $vin->url_saq,
            $vin->url_img,
            $vin->format,
            $vin->millesime,
            $vin->personnalise,
            $id
        ]);
    }

    /**
     * Modifier certains des champs d'une bouteille spécifié
     *
     * Cette requête peut gérer seulement la modification des colonnes: quantité, date_achat * et garde_jusqua pour une bouteille importée de la Saq ou crée par l'usager. Pour 
     * pouvoir changer l'ensemble des colonnes pour une bouteille, le faire avec la méthode 
     * remplacer (PUT). 
     * 
     * @param  array $params Tableau associatif des paramètres de la requête
     * @param  array $idEntite Tableau associatif des paramètres de la requête
     * @param  mixed $fragmentVin Payload du corps du message HTTP en format JSON
     * @return void
     */
    public function changer($params, $idEntite, $fragmentVin)
    {
        $this->modifier("UPDATE vino__bouteille_has_vino__cellier SET 	
        quantite=:fragment_vin , date_achat=:fragment_dateAchat, garde_jusqua=:fragment_dateGarde WHERE vino__bouteille_id=:vin_id AND vino__cellier_id=:cellier_id",  ['cellier_id' => $params["cellier"], 'vin_id' => $idEntite["bouteille"], 'fragment_vin' => $fragmentVin->quantite, 'fragment_dateAchat' => $fragmentVin->date_achat, 'fragment_dateGarde' => $fragmentVin->garde_jusqua]);
    }
}