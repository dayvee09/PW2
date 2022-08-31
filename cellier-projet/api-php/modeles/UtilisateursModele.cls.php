<?php
class UtilisateursModele extends AccesBd
{
    public function tout($params)
    {
        if (isset($params['email'])) {
            return $this->lire("SELECT vino__utilisateur.id, vino__utilisateur.email FROM vino__utilisateur JOIN vino__cellier ON vino__utilisateur.id=vino__cellier.vino__utilisateur_id WHERE vino__utilisateur.email=:email", ['email' => $params["email"]]);
        } else {
            return $this->lire("SELECT vino__utilisateur.id, vino__utilisateur.email FROM vino__utilisateur");
        }
    }

    public function un($params)
    {
        return $this->lireUn("SELECT vino__utilisateur.id, vino__utilisateur.email FROM vino__utilisateur JOIN vino__cellier ON vino__utilisateur.id=vino__cellier.vino__utilisateur_id WHERE vino__utilisateur.email=:email", ['email' => $params["email"]]);
    }

    public function ajouter($utilisateur)
    {
        $last_insert_id = $this->creer("INSERT INTO vino__utilisateur (vino__utilisateur.email) VALUES (?)", [$utilisateur->email]);
        $last_insert_id = $this->creer("INSERT INTO vino__cellier (vino__cellier.nom, vino__utilisateur_id) VALUES (?, ?)", ["Coucou", $last_insert_id]);
        return $last_insert_id;
    }

    public function retirer($params)
    {
        return $this->supprimer("DELETE FROM vino__utilisateur WHERE vino__utilisateur.email=:email", ['email' => $params['email']]);
    }

    public function remplacer($id, $cellier)
    {
        return $this->modifier("UPDATE vino__cellier SET vino__cellier.nom=? WHERE id=?", [
            $cellier->nom,
            $id
        ]);
    }
}
