<?php
class VinsInventaireControleur extends Controleur
{    
    /**
     * Récupérer les inventaires de toutes les bouteilles à un utilisteur connecté
     *
     * @param  array $params tableau associatif
     * @return void
     */
    public function tout($params)
    {
        $groupe = false;
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->tout($params);
    }
    
    /**
     * Récupérer les inventaires à une bouteille spécifié
     *
     */
    public function un($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->un($params, $idEntite);
    }
    
    /**
     * Non appliqué
     *
     */
    public function ajouter($vin)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 201 Created';
        $this->reponse['corps'] = ['id' => $this->modele->ajouter(json_decode($vin))];
    }
    
    /**
     * Non appliqué
     *
     */
    public function remplacer($id, $vin)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->remplacer($id, json_decode($vin));
    }
    
    /**
     * Non appliqué
     *
     */
    public function changer($params, $idEntite, $fragmentVin)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->changer($params, $idEntite, json_decode($fragmentVin));
    }
    
    /**
     * Non appliqué
     *
     */
    public function retirer($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = ['nombre' => $this->modele->retirer($params, $idEntite)];
    }
}