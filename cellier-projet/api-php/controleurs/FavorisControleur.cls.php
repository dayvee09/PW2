<?php
class FavorisControleur extends Controleur
{    
    /**
     * Récupérer toutes les bouteilles favories à un utilisateur connecté - Méthod 'GET'
     *
     * @param  mixed $params ex: $params['utilisateurId'] 
     * @return void
     */
    public function tout($params)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->tout($params);
    }
    
    /**
     * Non appliqué - Méthod 'GET'
     *
     */
    public function un($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->un($params, $idEntite);
    }
    
    /**
     * Ajouter une bouteille à favorie - Méthod 'POST'
     *
     * @param  mixed $vin
     * @return void
     */
    public function ajouter($vin)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 201 Created';
        $this->reponse['corps'] = ['id' => $this->modele->ajouter(json_decode($vin))];
    }
    
    /**
     * Non appliqué - Méthod 'PUT'
     *
     */
    public function remplacer($id, $vin)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->remplacer($id, json_decode($vin));
    }
    
    /**
     *  Non appliqué - Méthod 'PATCH'
     *
     */
    public function changer($params, $idEntite, $fragmentEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->changer($params, $idEntite, json_decode($fragmentEntite));
    }
    
    /**
     * Supprimer une bouteille favorie spécifié à un utilisateur connecté - Méthod 'DELETE'
     *
     * @param  mixed $params ex:$params['utilisateur']
     * @param  mixed $idEntite ex: idEntite["vin"]
     * @return void
     */
    public function retirer($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = ['nombre' => $this->modele->retirer($params, $idEntite)];
    }
}