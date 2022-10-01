<?php
class CelliersControleur extends Controleur
{    
    /**
     * Récupérer tous les celliers à un utilisateur connecté - Méthod 'GET'
     *
     * @param  array $params ex: $params['user_id']
     * @return void
     */
    public function tout($params)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->tout($params);
    }
    
    /**
     * Récupérer un cellier spécifié à un utilisateur connecté - Méthod 'GET'
     *
     * @param  array $params
     * @param  array $idEntite ex: $idEntite["cellier"]
     * @return void
     */
    public function un($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->un($params, $idEntite);
    }
    
    /**
     *  Ajouter un nouveau cellier à un utilisateur connecté - Méthod 'POST'
     *
     * @param  mixed $cellier qui représent le payload en json 
     * @return void
     */
    public function ajouter($cellier)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 201 Created';
        $this->reponse['corps'] = ['id' => $this->modele->ajouter(json_decode($cellier))];
    }
    
    /**
     * Non appliqué - Méthod 'PUT'
     *
     */
    public function remplacer($id, $cellier)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->remplacer($id, json_decode($cellier));
    }
    
    /**
     * Modifier certains champs d'un cellier spécifié à un utilisateur connecté - Méthod 'PATCH'
     *
     * @param  array $params ex: $params['cellier'] qui représent l'id d'un cellier spécifié
     * @param  mixed $idEntite
     * @param  mixed $fragmentEntite qui représent le payload en json y compris le nom d'un cellier spécifié
     * @return void
     */
    public function changer($params, $idEntite, $fragmentEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->changer($params, $idEntite, json_decode($fragmentEntite));
    }
    
    /**
     * Supprimer un cellier spécifié à un utilisateur connecté - Méthod 'DELETE'
     *
     * @param  array $params ex: params['cellier'] qui représent l'id d'un cellier spécifié
     * @param  null $idEntite
     * @return void
     */
    public function retirer($params, $idEntite = null)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = ['nombre' => $this->modele->retirer($params, $idEntite)];
    }
}