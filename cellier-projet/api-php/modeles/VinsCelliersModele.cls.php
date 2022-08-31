<?php
class VinsCelliersModele extends AccesBd
{
    public function tout($params)
    {

        return $this->lire("SELECT  vino__cellier.vino__utilisateur_id as user_id, vino__bouteille.id, vino__bouteille.nom, vino__cellier_id, quantite, date_achat, garde_jusqua, notes FROM vino__bouteille JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id=vino__bouteille_has_vino__cellier.vino__bouteille_id JOIN vino__type ON vino__bouteille.vino__type_id=vino__type.id JOIN vino__cellier ON vino__cellier.id =vino__bouteille_has_vino__cellier.vino__cellier_id where vino__cellier.vino__utilisateur_id =:user_id ORDER BY vino__bouteille.id ASC", ['user_id' => $params['user_id']]);
    }

    public function un($params, $idEntite)
    {
        $id_vin = intval($idEntite['vins']);
        $id_cellier = intval($idEntite['celliers']);
        return $this->lireUn("SELECT nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, millesime,personnalise, vino__cellier_id, quantite, date_achat, garde_jusqua, notes FROM vino__bouteille JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id=vino__bouteille_has_vino__cellier.vino__bouteille_id WHERE vino__bouteille.id=:vin_id and vino__bouteille_has_vino__cellier.vino__cellier_id=:cellier_id", ['vin_id' => $id_vin, 'cellier_id' => $id_cellier]);
    }

    public function ajouter($vin)
    {
        
    }

    public function retirer($id)
    {
        //     $this->supprimer("DELETE FROM vino__bouteille_has_vino__cellier WHERE vino__bouteille_has_vino__cellier.	
        //     vino__bouteille_id=:vin_id", ['vin_id' => $id]);
        //     return $this->supprimer("DELETE FROM vino__bouteille WHERE vino__bouteille.id=:vin_id", ['vin_id' => $id]);
        // 
    }

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
        // {
        //   "quantite":100,
        //   "date_achat":"2011-01-01",
        //   "garde_jusqua": "2023", 
        //   "notes": "SS"
        // }
    }
}
