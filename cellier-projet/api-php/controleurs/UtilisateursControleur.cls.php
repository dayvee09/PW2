<?php
class UtilisateursControleur extends Controleur
{
    /**
     * Récupérer tous les informations de tous les utilisateurs 
     *
     * @param  mixed $params
     * @return void
     */
    public function tout($params)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->tout($params);
    }

    /**
     * Récupérer tous les informations d'un utilisateur connecté
     *
     * @param  mixed $params
     * @param  mixed $idEntite
     * @return void
     */
    public function un($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->un($params, $idEntite);
    }

    /**
     * Ajouter un nouveau utilisateur
     *
     * @param  mixed $utilisateur
     * @return void
     */
    public function ajouter($utilisateur)
    {
        try {
            $payload = json_decode($utilisateur);
            if (!$payload || !isset($payload->email, $payload->nom)) {
                throw new InvalidArgumentException('Corps JSON invalide (email et nom requis).');
            }
            $id = $this->modele->ajouter($payload);
            $this->reponse['entete_statut'] = 'HTTP/1.1 201 Created';
            $this->reponse['corps'] = ['id' => $id];
        } catch (Throwable $e) {
            $this->reponse['entete_statut'] = 'HTTP/1.1 500 Internal Server Error';
            $this->reponse['corps'] = ['erreur' => $e->getMessage()];
        }
    }

    /**
     * Modifier tous les champs d'un utilisateur spécifié
     *
     * @param  mixed $id
     * @param  mixed $utilisateur
     * @return void
     */
    public function remplacer($id, $utilisateur)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->remplacer($id, json_decode($utilisateur));
    }

    /**
     * Modifier certains champs d'un utilisateur spécifié
     *
     * @param  mixed $params
     * @param  mixed $idEntite
     * @param  mixed $fragmentEntite
     * @return void
     */
    public function changer($params, $idEntite, $fragmentEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->changer($params, json_decode($fragmentEntite));
    }

    /**
     * Supprimer un utilisateur spécifié 
     *
     * @param  mixed $params
     * @param  mixed $idEntite
     * @return void
     */
    public function retirer($params, $idEntite = null)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = ['nombre' => $this->modele->retirer($params, $idEntite)];
    }
}
