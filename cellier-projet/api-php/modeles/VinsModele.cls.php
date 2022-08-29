<?php
class VinsModele extends AccesBd
{
    public function tout($params)
    {
        return $this->lire("SELECT  vino__cellier.vino__utilisateur_id as user_id, vino__bouteille.id, vino__bouteille.nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, millesime,personnalise, vino__cellier_id, quantite, date_achat, garde_jusqua, notes FROM vino__bouteille JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id=vino__bouteille_has_vino__cellier.vino__bouteille_id JOIN vino__type ON vino__bouteille.vino__type_id=vino__type.id JOIN vino__cellier ON vino__cellier.id =vino__bouteille_has_vino__cellier.vino__cellier_id where vino__cellier.vino__utilisateur_id =:user_id ORDER BY vino__bouteille.id ASC", ['user_id' => $params['user_id']]);
    }

    public function un($id)
    {
        return $this->lireUn("SELECT nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, millesime,personnalise, vino__cellier_id, quantite, date_achat, garde_jusqua, notes FROM vino__bouteille JOIN vino__bouteille_has_vino__cellier ON vino__bouteille.id=vino__bouteille_has_vino__cellier.vino__bouteille_id WHERE vino__bouteille.id=:vin_id", ['vin_id' => $id]);
    }

    public function ajouter($vin)
    {
        $nouveau_id = $this->creer("INSERT INTO vino__bouteille (nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, millesime,personnalise) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [$vin->nom, $vin->image, $vin->code_saq, $vin->pays, $vin->description, $vin->prix_saq, $vin->url_saq, $vin->url_img, $vin->format, $vin->vino__type_id, $vin->millesime, $vin->personnalise]);
        return $this->creer("INSERT INTO `vino__bouteille_has_vino__cellier` (`vino__bouteille_id`, `vino__cellier_id`, `quantite`, `date_achat`, `garde_jusqua`, `notes`) VALUES
            (?, ?, ?, ?, ?, ?)", [$nouveau_id, $vin->vino__cellier_id, $vin->quantite, $vin->date_achat, $vin->garde_jusqua, $vin->notes]);
    }

    public function retirer($id)
    {
        $this->supprimer("DELETE FROM vino__bouteille_has_vino__cellier WHERE vino__bouteille_has_vino__cellier.	
        vino__bouteille_id=:vin_id", ['vin_id' => $id]);
        return $this->supprimer("DELETE FROM vino__bouteille WHERE vino__bouteille.id=:vin_id", ['vin_id' => $id]);
    }

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
}
