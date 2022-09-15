<?php
// Front Controller (Contrôleur Pilote)
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE");

$urlRequete = $_SERVER['REQUEST_URI'];
// echo $urlRequete;
// echo "\n\n";

$routeur = new Routeur(
    parse_url($urlRequete, PHP_URL_PATH),
    $_GET,
    $_SERVER['REQUEST_METHOD']
);

$routeur->invoquerRoute();

class Routeur
{
    private $route = '';
    private $params = '';
    private $methode = '';

    function __construct($r, $p, $m)
    {
        $this->route = $r;
        $this->params = $p;
        $this->methode = $m;

        // Autochargement des fichiers de classe
        spl_autoload_register(function ($nomClasse) {
            $nomFichier = "$nomClasse.cls.php";
            if (file_exists("controleurs/$nomFichier")) {
                include("controleurs/$nomFichier");
            } else if (file_exists("modeles/$nomFichier")) {
                include("modeles/$nomFichier");
            }
        });
    }

    public function invoquerRoute()
    {
        // Exemples d'URLs : 
        // /index.php/plats, /plats/17, /vins, /vins/5
        $collection = "celliers";
        $idEntite = [];
        $params = [];


        $partiesRoute = explode('/', $this->route);

        // Debugging du routeur:

        // print_r($partiesRoute);
        // echo '<hr>';
        // echo 'Paramètres (querystring) : ' . $this->params;
        // echo '<hr>';
        // echo 'Méthod HTTP : ' . $this->methode;


        // Routeur pour le serveur de développement (Ne pas effacer):

        // if (count($partiesRoute) > 7 && trim(urldecode($partiesRoute[7])) != '') {
        //     $collection = trim(urldecode($partiesRoute[7]));
        //     $params = [$partiesRoute[5] => trim(urldecode($partiesRoute[6]))];
        //     //print_r($params);
        //     if (count($partiesRoute) > 8 && trim(urldecode($partiesRoute[8])) != '') {
        //         $idEntite = [$partiesRoute[8] => trim(urldecode($partiesRoute[9]))];
        //     }
        // }

        // Routeur en localhost:

        if (count($partiesRoute) > 6 && trim(urldecode($partiesRoute[6])) != '') {
            $collection = trim(urldecode($partiesRoute[6]));
            $params = [$partiesRoute[4] => trim(urldecode($partiesRoute[5]))];
            //print_r($params);
            if (count($partiesRoute) > 7 && trim(urldecode($partiesRoute[7])) != '') {
                $idEntite = [$partiesRoute[7] => trim(urldecode($partiesRoute[8]))];
            }
        }



        // Alternative de modèle de routeur:

        // //http://localhost/PW2/cellier-projet/api-php/user_id/3/celliers/6/vins/7
        // if (count($partiesRoute) > 9 && trim(urldecode($partiesRoute[9])) != '') {
        //     //$collection = VinsCelliers
        //     $collection = trim(urldecode($partiesRoute[8])).trim(urldecode($partiesRoute[6]));
        //     // idEntite = ['celliers'=>6, 'vins'=>'7']
        //     $idEntite = [$partiesRoute[6] => trim(urldecode($partiesRoute[7])), 
        //                  $partiesRoute[8] => trim(urldecode($partiesRoute[9]))];
        // }

        $nomControleur = ucfirst($collection) . 'Controleur';
        $nomModele = ucfirst($collection) . 'Modele';

        if (class_exists($nomControleur)) {
            $controleur = new $nomControleur($nomModele);
            switch ($this->methode) {
                case 'GET':
                    if ($idEntite) {
                        $controleur->un($params, $idEntite);
                    } else {
                        $controleur->tout($params);
                    }
                    break;
                case 'POST':
                    $controleur->ajouter(file_get_contents('php://input'));
                    break;
                case 'PUT':
                    if (isset($idEntite)) {
                        $controleur->remplacer($idEntite, file_get_contents('php://input'));
                    } else {
                        $controleur->changer($params, file_get_contents('php://input'));
                    }
                    break;
                case 'PATCH':
                    if (isset($idEntite)) {
                        $controleur->changer($params, $idEntite, file_get_contents('php://input'));
                    } else {
                        $controleur->changer($params, file_get_contents('php://input'));
                    }
                    break;
                case 'DELETE':
                    if (isset($idEntite)) {
                        $controleur->retirer($params, $idEntite);
                    } else {
                        $controleur->retirer($params);
                    }
                    break;
            }
        } else {
            exit("Mauvaise requête (à compléter)");
        }
    }
}
