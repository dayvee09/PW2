<?php
abstract class Controleur
{
    protected $modele; // Référence au "Modele" correspondant au "Controleur"
                       // Tableau associatif contenant l'entête de statut (Status Header) et le corps 
                       // (BODY) du message HTTP de réponse. Ce tableau aura la forme suivante : 
                       // ['entete_statut'=> 'Valeur...', 'corps'=>'Valeur du corps du message']
    protected $reponse;
    
    /**
     * Construire le modèle correspondant au 'controleur'
     *
     * @param  mixed $nomModele
     * @return void
     */
    function __construct($nomModele)
    {
        if (class_exists($nomModele)) {
            $this->modele = new $nomModele();
        }
    }

    /* Contrat pour les méthodes spécifiques de chaque contrôleur concret */
    public abstract function tout($params); // - Méthod 'GET'
    public abstract function un($params, $idEntite);//- Méthod 'GET'
    public abstract function ajouter($entite); //- Méthod 'POST'
    public abstract function remplacer($id, $entite); //- Méthod 'PUT'
    public abstract function changer($params, $idEntite, $fragmentEntite);//- Méthod 'PATCH'
    public abstract function retirer($params, $idEntite);//- Méthod 'DELETE'
    
    /**
     * Produire une réponse de la requête HTTP 
     *
     * @return void string JSON
     */
    private function produireReponse()
    {
        header($this->reponse['entete_statut']);
        if ($this->reponse['corps']) {
            echo json_encode($this->reponse['corps']);
        } else {
            echo json_encode(['erreur' => 'Rien trouvé']);
        }
    }
    
    /**
     * Renvoyer la reponse de la requête HTTP quand le controlleur instancié sera supprimé
     *
     * @return void
     */
    function __destruct()
    {
        $this->produireReponse();
    }
}