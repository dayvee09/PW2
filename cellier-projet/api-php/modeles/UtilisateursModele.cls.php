<?php
class UtilisateursModele extends AccesBd
{
    /**
     * Récupérer tous les utilisateurs 
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return array Tableau associatif contenant des tableau des données 
     */
    public function tout($params)
    {
        if (isset($params['email'])) {
            $utilisateur = $this->parEmail($params['email']);
            return $utilisateur ? [$utilisateur] : [];
        } else {
            return $this->lire("SELECT vino__utilisateur.id, vino__utilisateur.email, vino__utilisateur.nom FROM vino__utilisateur");
        }
    }

    /**
     * Récupérer un enregistrement d'un utilisateur spécifié par son email unique
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return array Tableau associatif ayant seulement un entregistrement cherché
     */
    public function un($params)
    {
        $email = $params['email'] ?? $params['admin'] ?? null;
        if (!$email) {
            return false;
        }
        return $this->parEmail($email);
    }

    /**
     * Trouver un utilisateur par courriel (sans exiger un cellier associé).
     *
     * @return object|false
     */
    public function parEmail($email)
    {
        $row = $this->lireUn(
            "SELECT id, email, nom, privilege FROM vino__utilisateur WHERE email = :email",
            ['email' => $email]
        );
        return is_object($row) ? $row : false;
    }

    /**
     * Ajouter un nouveau utilisateur et son premier cellier par défault.
     * Si le courriel existe déjà, renvoie l'id existant.
     *
     * @param  mixed $utilisateur Payload du corps du message HTTP en format JSON
     * @return int Identifiant de l'utilisateur
     */
    public function ajouter($utilisateur)
    {
        $existant = $this->parEmail($utilisateur->email);
        if ($existant !== false) {
            return (int) $existant->id;
        }

        $userId = $this->creer(
            "INSERT INTO vino__utilisateur (email, nom) VALUES (?, ?)",
            [$utilisateur->email, $utilisateur->nom]
        );
        $this->creer(
            "INSERT INTO vino__cellier (nom, vino__utilisateur_id) VALUES (?, ?)",
            ["Cellier par défaut", $userId]
        );
        return $userId;
    }

    /**
     * Supprimer un utilisateur spécifié
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return int Nombre d'enregistrement affecté
     */
    public function retirer($params)
    {
        return $this->supprimer("DELETE FROM vino__utilisateur WHERE vino__utilisateur.email=:email", ['email' => $params["email"]]);
    }

    /**
     * Modifier certains des champs d'un utilisateur connecté
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @param  mixed $fragmentUtilisateur Payload du corps du message HTTP en format JSON
     * @return void
     */
    public function changer($params, $fragmentUtilisateur)
    {
        if (isset($fragmentUtilisateur->email)) {
            return $this->modifier("UPDATE vino__utilisateur SET vino__utilisateur.email=:fragment_utilisateur  WHERE vino__utilisateur.email=:email ", [
                'email' => $params["email"],
                'fragment_utilisateur' => $fragmentUtilisateur->email
            ]);
        } else if (isset($fragmentUtilisateur->nom)) {
            return $this->modifier("UPDATE vino__utilisateur SET vino__utilisateur.nom=:fragment_utilisateur  WHERE vino__utilisateur.email=:email ", [
                'email' => $params["email"],
                'fragment_utilisateur' => $fragmentUtilisateur->nom
            ]);
        }
    }
}
