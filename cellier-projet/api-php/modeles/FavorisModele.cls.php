<?php
class FavorisModele extends AccesBd
{
    public function tout($params)
    {
        if (isset($params['utilisateur'])) {
            return $this->lire("SELECT vino__favoris.vino__bouteille_id, vino__bouteille.nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, vino__type.type, millesime,personnalise, vino__cellier_id, quantite, date_achat, garde_jusqua, notes FROM vino__favoris JOIN vino__utilisateur ON vino__favoris.vino__utilisateur_id = vino__utilisateur.id JOIN vino__bouteille ON vino__favoris.vino__bouteille_id = vino__bouteille.id JOIN vino__type ON vino__type.id = vino__bouteille.vino__type_id JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id = vino__bouteille_has_vino__cellier.vino__bouteille_id WHERE vino__favoris.vino__utilisateur_id = :utilisateur GROUP BY vino__favoris.vino__bouteille_id", ['utilisateur' => $params['utilisateur']]);
        } else if (isset($params['utilisateurId'])) {
            return $this->lire("SELECT vino__favoris.vino__bouteille_id FROM vino__favoris JOIN vino__utilisateur ON vino__favoris.vino__utilisateur_id = vino__utilisateur.id WHERE vino__favoris.vino__utilisateur_id = :utilisateurId GROUP BY vino__favoris.vino__bouteille_id", ['utilisateurId' => $params['utilisateurId']]);
        }
    }

    public function un($params, $idEntite)
    {
        $id_vin = intval($idEntite['vins']);
        $id_cellier = intval($idEntite['celliers']);
        return $this->lireUn("SELECT nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, millesime,personnalise, vino__cellier_id, quantite, date_achat, garde_jusqua, notes FROM vino__bouteille JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id=vino__bouteille_has_vino__cellier.vino__bouteille_id WHERE vino__bouteille.id=:vin_id and vino__bouteille_has_vino__cellier.vino__cellier_id=:cellier_id", ['vin_id' => $id_vin, 'cellier_id' => $id_cellier]);
    }

    public function ajouter($vin)
    {
        return $this->creer("INSERT INTO vino__favoris (vino__bouteille_id, vino__utilisateur_id) VALUES (?, ?)", [$vin->vino__bouteille_id, $vin->vino__utilisateur_id]);
    }

    public function retirer($utilisateur, $vin)
    {
        return $this->supprimer("DELETE FROM vino__favoris WHERE vino__bouteille_id=:vin AND vino__utilisateur_id=:utilisateur", ['vin' => $vin["vin"], 'utilisateur' => $utilisateur["utilisateur"]]);
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
