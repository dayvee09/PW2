<?php
class CelliersModele extends AccesBd
{
    public function tout($params)
    {
        return $this->lire("SELECT vino__cellier.id, vino__cellier.nom, vino__utilisateur_id FROM vino__cellier JOIN vino__utilisateur ON vino__utilisateur.id =vino__cellier.vino__utilisateur_id where vino__cellier.vino__utilisateur_id =:user_id", ['user_id' => $params['user_id']]);
    }

    public function un($params, $idEntite)
    {
        return $this->lireUn("SELECT vino__cellier.id, vino__cellier.nom, vino__utilisateur_id FROM vino__cellier JOIN vino__utilisateur ON vino__utilisateur.id =vino__cellier.vino__utilisateur_id where vino__cellier.id =:cellier_id", ['cellier_id' => $idEntite["cellier"]]);
    }

    public function ajouter($cellier)
    {
        return $this->creer("INSERT INTO vino__cellier (vino__cellier.nom, vino__utilisateur_id) VALUES (?, ?)", [$cellier->nom, $cellier->vino__utilisateur_id]);
    }

    public function retirer($id)
    {
        return $this->supprimer("DELETE FROM vino__cellier WHERE vino__cellier.id=:id", ['id' => $id["cellier"]]);
    }

    public function remplacer($id, $cellier)
    {
        return $this->modifier("UPDATE vino__cellier SET vino__cellier.nom=:cellier  WHERE vino__cellier.id=:id", ['id' => $id["cellier"], 'cellier' => $cellier->nom]);
    }
}
