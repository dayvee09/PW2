<?php
class VinsInventaireModele extends AccesBd
{   //URL : http://localhost/PW2/cellier-projet/api-php/user_id/2/vinsInventaire/
    public function tout($params)
    {   
        return $this->lire("SELECT vino__bouteille.id, vino__bouteille.nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, vino__type.type, millesime,personnalise,SumQuantiteParBouteille.quantite_total, SumQuantiteParBouteille.quantite_total*prix_saq as prix_total FROM vino__bouteille
        JOIN vino__type ON vino__bouteille.vino__type_id=vino__type.id
        JOIN (SELECT  vino__bouteille_has_vino__cellier.vino__bouteille_id as bouteille_id, sum(quantite) as quantite_total from vino__bouteille_has_vino__cellier JOIN vino__cellier ON vino__cellier.id =vino__bouteille_has_vino__cellier.vino__cellier_id JOIN vino__utilisateur ON vino__utilisateur.id = vino__cellier.vino__utilisateur_id where vino__utilisateur.id=:user_id GROUP BY bouteille_id) SumQuantiteParBouteille
        ON SumQuantiteParBouteille.bouteille_id = vino__bouteille.id
        ORDER BY vino__bouteille.id", ['user_id' => $params['user_id']]);
    }

    public function un($params, $idEntite)
    {
         //URL : localhost/PW2/cellier-projet/api-php/user_id/2/vinsInventaire/vin_id/1
        return $this->lire("SELECT vino__bouteille.id , vino__bouteille.nom, `image`, code_saq, pays, `description`, prix_saq, url_saq, url_img, `format`, vino__type_id, vino__type.type, millesime,personnalise,SumQuantiteParBouteille.quantite_total, SumQuantiteParBouteille.quantite_total*prix_saq as prix_total, celliers.cellier_id as cellier_id, celliers.quantite as quantite, celliers.cellier_nom as cellier_nom FROM vino__bouteille JOIN vino__type ON vino__bouteille.vino__type_id=vino__type.id
        JOIN (SELECT  vino__bouteille_has_vino__cellier.vino__bouteille_id as bouteille_id, sum(quantite) as quantite_total from vino__bouteille_has_vino__cellier JOIN vino__cellier ON vino__cellier.id =vino__bouteille_has_vino__cellier.vino__cellier_id JOIN vino__utilisateur ON vino__utilisateur.id = vino__cellier.vino__utilisateur_id where vino__utilisateur.id=:user_id GROUP BY bouteille_id) SumQuantiteParBouteille
        ON SumQuantiteParBouteille.bouteille_id = vino__bouteille.id
        JOIN (SELECT vino__bouteille_id,vino__cellier_id as cellier_id,vino__cellier.nom as cellier_nom, quantite FROM vino__bouteille_has_vino__cellier JOIN vino__cellier ON vino__cellier.id = vino__bouteille_has_vino__cellier.vino__cellier_id JOIN vino__utilisateur ON vino__utilisateur.id = vino__cellier.vino__utilisateur_id WHERE vino__utilisateur.id=:user_id and vino__bouteille_id=:vin_id) celliers 
        ON celliers.vino__bouteille_id = vino__bouteille.id", ['vin_id' => $idEntite["vin_id"], 'user_id' => $params["user_id"]]);
    }

}
