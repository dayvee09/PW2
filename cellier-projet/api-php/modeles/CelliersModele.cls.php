<?php
class CelliersModele extends AccesBd
{

    /**
     * Récupérer tous les celliers à un utilisateur connecté
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return array Tableau associatif contenant des tableaux des données
     */
    public function tout($params)
    {
        return $this->lire("SELECT vino__cellier.id, vino__cellier.nom, vino__utilisateur_id FROM vino__cellier JOIN vino__utilisateur ON vino__utilisateur.id =vino__cellier.vino__utilisateur_id where vino__cellier.vino__utilisateur_id =:user_id", ['user_id' => $params['user_id']]);
    }

    /**
     * Récupérer un cellier spécifié à un utilisateur connecté
     *
     * @param  array $params Tableau associatif des paramètres de la requête
     * @param  array $idEntite Tableau associatif des paramètres de la requête
     * @return array Tableau associatif ayant seulement un enregistrement cherché
     */
    public function un($params, $idEntite)
    {
        return $this->lireUn("SELECT  vino__cellier.nom FROM vino__cellier WHERE vino__cellier.id =:cellier_id", ['cellier_id' => $idEntite["cellier"]]);
    }

    /**
     * Ajouter un nouveau cellier à un utilisateur connecté
     *
     * @param  mixed $cellier Payload du corps du message HTTP en format JSON
     * @return int Identifiant (auto increment) du dernier enregistrement inséré
     */
    public function ajouter($cellier)
    {
        return $this->creer("INSERT INTO vino__cellier (vino__cellier.nom, vino__utilisateur_id) VALUES (?, ?)", [$cellier->nom, $cellier->vino__utilisateur_id]);
    }

    /**
     * Supprimer un cellier spécifié
     *
     * @param  array $id Tableau associatif des paramètres de la requête
     * @return int Nombre d'enregistrement affecté
     */
    public function retirer($id)
    {
        return $this->supprimer("DELETE FROM vino__cellier WHERE vino__cellier.id=:id", ['id' => $id["cellier"]]);
    }

    /**
     * Modifier certains des champs d'un cellier
     *
     * @param  array $id Tableau associatif des paramètres de la requête
     * @param  mixed $cellier
     * @param  mixed $fragmentCellier Payload du corps du message HTTP en format JSON
     * @return void 
     */
    public function changer($id, $cellier, $fragmentCellier)
    {
        return $this->modifier("UPDATE vino__cellier SET vino__cellier.nom=:nom WHERE vino__cellier.id=:id", [
            'id' => $id["cellier"],
            'nom' => $fragmentCellier->nom
        ]);
    }
}
