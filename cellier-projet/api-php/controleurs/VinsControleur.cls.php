<?php
class VinsControleur extends Controleur
{    
    /**
     * Récupérer la collection de toutes les bouteilles à un utilisteur connecté
     *
     * @param  mixed $params ex:$params['cellier'] qui représent l'id du cellier
     * @return void
     */
    public function tout($params)
    {
        $groupe = false;
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->tout($params);
    }
    
    /**
     * Récupérer la bouteille spécifiée dans un cellier spécifié
     *
     * @param  mixed $params ex: $params["cellier"] qui représent l'id du cellier
     * @param  mixed $idEntite ex: $idEntite["bouteille"] qui représent l'id de la bouteiller
     * @return void
     */
    public function un($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->un($params, $idEntite);
    }
    
    /**
     * Ajouter une nouvelle bouteille dans un cellier spécifié
     *
     * @param  mixed $vin qui représent le payload des informations d'une nouvelle bouteille
     * @return void
     */
    public function ajouter($vin)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 201 Created';
        $this->reponse['corps'] = ['id' => $this->modele->ajouter(json_decode($vin))];
    }
    
    /**
     * Modifier toutes les informations d'une bouteille spécifié
     *
     * @param  mixed $id  qui représent l'id de la bouteille
     * @param  mixed $vin qui représent le payload des information d'une bouteille 
     * @return void
     */
    public function remplacer($id, $vin)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->remplacer($id, json_decode($vin));
    }
    
    /**
     * Modifier certains des informations d'une bouteille spécifié
     *
     * @param  mixed $params ex: $params["cellier"] qui représent l'id du cellier
     * @param  mixed $idEntite ex:$idEntite["bouteille"] qui représent l'id de la bouteille
     * @param  mixed $fragmentVin qui représent le payload
     * @return void
     */
    public function changer($params, $idEntite, $fragmentVin)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = $this->modele->changer($params, $idEntite, json_decode($fragmentVin));
    }
    
    /**
     * Supprimer une bouteille spécifiée dans un cellier
     *
     * @param  mixed $params ex: $params["supprimer"] qui représent l'id de la bouteille à supprimer
     * @param  mixed $idEntite ex: $idEntite["cellier"] qui représent l'id du cellier
     * @return void
     */
    public function retirer($params, $idEntite)
    {
        $this->reponse['entete_statut'] = 'HTTP/1.1 200 OK';
        $this->reponse['corps'] = ['nombre' => $this->modele->retirer($params, $idEntite)];
    }
}