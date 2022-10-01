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
            return $this->lire("SELECT DISTINCT vino__utilisateur.id, vino__utilisateur.email, vino__utilisateur.privilege, vino__utilisateur.nom FROM vino__utilisateur JOIN vino__cellier ON vino__utilisateur.id=vino__cellier.vino__utilisateur_id WHERE vino__utilisateur.email=:email", ['email' => $params["email"]]);
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
        return $this->lireUn("SELECT vino__utilisateur.id, vino__utilisateur.email, vino__utilisateur.nom FROM vino__utilisateur JOIN vino__cellier ON vino__utilisateur.id=vino__cellier.vino__utilisateur_id WHERE vino__utilisateur.email=:email ", ['email' => $params["email"]]);
    }
    
    /**
     * Ajouter un nouveau utilisateur et son premier cellier par défault
     *
     * @param  mixed $utilisateur Payload du corps du message HTTP en format JSON
     * @return int Identifiant (auto increment) du dernier enregistrement inséré
     */
    public function ajouter($utilisateur)
    {
        $last_insert_id = $this->creer("INSERT INTO vino__utilisateur (vino__utilisateur.email, vino__utilisateur.nom) VALUES (?, ?)", [$utilisateur->email, $utilisateur->nom]);
        $last_insert_id = $this->creer("INSERT INTO vino__cellier (vino__cellier.nom, vino__utilisateur_id) VALUES (?, ?)", ["Coucou", $last_insert_id]);
        return $last_insert_id;
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