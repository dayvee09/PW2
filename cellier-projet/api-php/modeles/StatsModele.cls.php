<?php
class StatsModele extends AccesBd
{
    /**
     * Récupérer le nombre total des différents bouteilles et le prix total à un cellier spécifié 
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return array Tableau associatif contenant des tableaux des données
     */
    public function tout($params)
    {
        return $this->lire("SELECT count(*) as compte, sum(prix_saq * quantite) as somme FROM vino__bouteille JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id=vino__bouteille_has_vino__cellier.vino__bouteille_id JOIN vino__type ON vino__bouteille.vino__type_id=vino__type.id JOIN vino__cellier ON vino__cellier.id =vino__bouteille_has_vino__cellier.vino__cellier_id where vino__bouteille_has_vino__cellier.vino__cellier_id =:cellier ORDER BY vino__bouteille.id ASC", ['cellier' => $params['cellier']]);
    }

    /**
     * Récupérer l'enregistrement d'une bouteille spécifié dans un cellier spécifié
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @param  array $idEntite Tableau associatif des paramètres de la requête
     * @return array Tableau associatif ayant seulement un entregistrement cherché
     */
    public function un($params, $idEntite)
    {
        $id_vin = intval($idEntite['vins']);
        $id_cellier = intval($idEntite['celliers']);
        return $this->lireUn("SELECT nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, millesime,personnalise, vino__cellier_id, quantite, date_achat, garde_jusqua, notes FROM vino__bouteille JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id=vino__bouteille_has_vino__cellier.vino__bouteille_id WHERE vino__bouteille.id=:vin_id and vino__bouteille_has_vino__cellier.vino__cellier_id=:cellier_id", ['vin_id' => $id_vin, 'cellier_id' => $id_cellier]);
    }

    /**
     * Modifier des informations d'une bouteille spécifié
     *
     */
    public function remplacer($id, $vin)
    {
        $id_vin = intval($id['vins']);
        $id_cellier = intval($id['celliers']);
        return  $this->modifier("UPDATE vino__bouteille_has_vino__cellier SET 	
      quantite=?, date_achat=?, garde_jusqua=?, notes=? WHERE vino__bouteille_id=? and vino__cellier_id=?", [
            $vin->quantite,
            $vin->date_achat,
            $vin->garde_jusqua,
            $vin->notes,
            $id_vin,
            $id_cellier
        ]);
        // *-- payload -"PUT" -- "http://localhost/PW2/cellier-projet/api-php/user_id/3/celliers/6/vins/7" */
        // Exemple pour test:
        // {
        //   "quantite":100,
        //   "date_achat":"2011-01-01",
        //   "garde_jusqua": "2023", 
        //   "notes": "SS"
        // }
    }
}
