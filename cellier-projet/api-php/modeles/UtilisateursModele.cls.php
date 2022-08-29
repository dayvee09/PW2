<?php
class UtilisateursModele extends AccesBd
{
    public function tout($params)
    {
        return $this->lire("SELECT vino__utilisateur.id, vino__utilisateur.email FROM vino__utilisateur JOIN vino__cellier ON vino__utilisateur.id=vino__cellier.vino__utilisateur_id WHERE vino__utilisateur.email=:email GROUP BY vino__utilisateur.email", ['email' => $params["email"]]);
    }

    public function un($id)
    {
        return $this->lireUn("SELECT vino__utilisateur.id, vino__utilisateur.email FROM vino__utilisateur JOIN vino__cellier ON vino__utilisateur.id=vino__cellier.vino__utilisateur_id WHERE vino__utilisateur.email=:id", ['id' => $id]);
    }

    public function ajouter($utilisateur)
    {
        return $this->creer("INSERT INTO vino__utilisateur (vino__utilisateur.email) VALUES (?)", [$utilisateur->email]);
    }

    public function retirer($id)
    {
        return $this->supprimer("DELETE FROM vino__utilisateur WHERE vino__utilisateur.id=:id", ['id' => $id]);
    }

    public function remplacer($id, $cellier)
    {
        return $this->modifier("UPDATE vino__cellier SET vino__cellier.nom=? WHERE id=?", [
            $cellier->nom,
            $id
        ]);
    }
}
