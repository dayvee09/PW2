<?php
class SaqModele extends AccesBd
{
    /**
     * Récupérer tous les bouteilles importées de la SAQ qui se trouve dans le cellier numéro 1 réservé pour l'administrateur
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return array Tableau associatif contenant des tableaux des données
     */
    public function tout($params)
    {
        return $this->lire("SELECT  vino__cellier.vino__utilisateur_id, vino__bouteille.id, vino__bouteille.nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, vino__type.type, millesime,personnalise, vino__cellier_id, quantite, date_achat, garde_jusqua, notes FROM vino__bouteille JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id=vino__bouteille_has_vino__cellier.vino__bouteille_id JOIN vino__type ON vino__bouteille.vino__type_id=vino__type.id JOIN vino__cellier ON vino__cellier.id =vino__bouteille_has_vino__cellier.vino__cellier_id where vino__bouteille_has_vino__cellier.vino__cellier_id =:cellier ORDER BY vino__bouteille.id ASC", ['cellier' => $params['cellier']]);
    }

    /**
     * Récupérer l'id d'une bouteille spécifié par son code_saq ou bien l'id du type selon le nom du type de la bouteille 
     *
     * @param  array $bte Tableau associatif des paramètres de la requête
     * @return int L'identifiant de l'enregistrement
     */
    public function un($bte)
    {
        if ($bte === "Vin rouge" || $bte === "Vin blanc" || $bte === "Vin rosé") {
            return $this->lireUn("select id from vino__type where type = :bte", ['bte' => $bte]);
        } else {
            return $this->lireUn("select id from vino__bouteille where code_saq = :bte", ['bte' => $bte]);
        }
    }
    
    /**
     * Ajouter(Importer) une nouvelle bouteille de la SAQ dans la bd
     *
     * @param  mixed $vin 
     * @param  mixed $type_id
     * @return void
     */
    public function ajouter($vin, $type_id)
    {

        $nouveau_id = $this->creer("INSERT INTO vino__bouteille (nom, vino__type_id, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, millesime, personnalise) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [$vin->nom, $type_id, $vin->img, $vin->desc->code_SAQ, $vin->desc->pays, $vin->desc->texte, floatval($vin->prix), $vin->url, $vin->img, $vin->desc->format, 2000, 0]);
        return $this->creer("INSERT INTO `vino__bouteille_has_vino__cellier` (`vino__bouteille_id`, `vino__cellier_id`, `quantite`, `date_achat`, `garde_jusqua`, `notes`) VALUES
            (?, ?, ?, ?, ?, ?)", [$nouveau_id, 1, 1, "2000-01-01", "2023", "Vin de la SAQ"]);
    }
    
    /**
     * Supprimer une bouteille spécifié par son id
     *
     * @param  array $id
     * @return void
     */
    public function retirer($id)
    {
        $this->supprimer("DELETE FROM vino__bouteille_has_vino__cellier WHERE vino__bouteille_has_vino__cellier.	
        vino__bouteille_id=:vin_id", ['vin_id' => $id]);
        return $this->supprimer("DELETE FROM vino__bouteille WHERE vino__bouteille.id=:vin_id", ['vin_id' => $id]);
    }

    /**
     * Non appliqué
     *
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
     * Non appliqué
     *
     */
    public function changer($params, $idEntite, $fragmentVin)
    {
        $this->modifier("UPDATE vino__bouteille_has_vino__cellier SET 	
        quantite=:fragment_vin , date_achat=:fragment_dateAchat, garde_jusqua=:fragment_dateGarde WHERE vino__bouteille_id=:vin_id AND vino__cellier_id=:cellier_id",  ['cellier_id' => $params["cellier"], 'vin_id' => $idEntite["bouteille"], 'fragment_vin' => $fragmentVin->quantite, 'fragment_dateAchat' => $fragmentVin->date_achat, 'fragment_dateGarde' => $fragmentVin->garde_jusqua]);
    }
}