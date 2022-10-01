<?php
class StatsControleur extends Controleur
{   
    /**
     * Récupérer le nombre total des différents bouteilles et le prix total à un cellier spécifié - Méthod 'GET'
     *
     * @param  mixed $params Tableau associatif des paramètres de la requête
     * @return void 
     */
    public function tout($params)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->tout($params);
    }
    
    /**
     * Récupérer l'enregistrement d'une bouteille spécifié dans un cellier spécifié - Méthod 'GET'
     *
     * @param  mixed $params Tableau associatif des paramètres de la requête
     * @param  mixed $idEntite Tableau associatif des paramètres de la requête
     * @return void
     */
    public function un($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->un($params, $idEntite);
    }
    
    /**
     * Non appliqué
     */
    public function ajouter($vin)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 201 Created';
        $this->reponse['corps'] = ['id' => $this->modele->ajouter(json_decode($vin))];
    }
    /**
     * Modifier toutes les informations d'une bouteille spécifié - Méthode 'PUT'
     *
     * @param  mixed $id
     * @param  mixed $vin
     * @return void
     */
    public function remplacer($id, $vin)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->remplacer($id, json_decode($vin));
    }
    /**
     * Non appliqué
     */
    public function changer($params, $idEntite, $fragmentEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->changer($params, $idEntite, json_decode($fragmentEntite));
    }
    /**
     * Non appliqué
     */
    public function retirer($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = ['nombre' => $this->modele->retirer($params, $idEntite)];
    }
}