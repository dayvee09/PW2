<<<<<<< HEAD
<?php
class AccesBd
{
    private $pdo = null;
    private $requetePdo = null;

    function __construct()
    {
        $configFile = dirname(__DIR__) . '/config.local.php';
        if (!is_readable($configFile)) {
            http_response_code(500);
            header('Content-Type: application/json; charset=UTF-8');
            echo json_encode([
                'erreur' => 'Configuration manquante. Copiez config.local.example.php vers config.local.php sur le serveur.',
            ]);
            exit;
        }

        $config = require $configFile;
        $host = $config['db_host'] ?? 'localhost';
        $name = $config['db_name'] ?? 'pw2';
        $user = $config['db_user'] ?? '';
        $pass = $config['db_pass'] ?? '';

        try {
            $options = [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            ];

            $this->pdo = new PDO(
                "mysql:host={$host};dbname={$name};charset=utf8",
                $user,
                $pass,
                $options
            );
        } catch (Exception $e) {
            http_response_code(500);
            header('Content-Type: application/json; charset=UTF-8');
            echo json_encode(['erreur' => 'Unable to connect to the database']);
            exit;
        }
    }

    private function soumettre($sql, $params = [])
    {
        $this->requetePdo = $this->pdo->prepare($sql);
        $this->requetePdo->execute($params);
    }

    protected function lire($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->requetePdo->fetchAll();
    }

    protected function lireUn($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->requetePdo->fetch();
    }

    protected function creer($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->pdo->lastInsertId();
    }

    protected function modifier($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->requetePdo->rowCount();
    }

    protected function supprimer($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->requetePdo->rowCount();
    }
}
=======
<?php
class AccesBd
{
    private $pdo = null;    // Objet de Connexion (PDO)
    private $requetePdo = null; // Objet de requête paramétrée PDO (PDOStatement)

    /**
     * __construct initialiser objet PDO pour créer un lien avec la base de donnée
     *
     * @return void
     */
    function __construct()
    {
        try {
            $options = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ, PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];

            // Connection à la base de données

            $this->pdo = new PDO(
                "mysql:host=localhost; dbname=pw2; charset=utf8",
                'root',
                '',
                $options
            );
        } catch (Exception $e) {
            echo 'Unable to connect to the database';
            echo $e->getMessage();
            exit;
        }
    }

    /**
     * Soumettre une requête paramétrée PDO
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return void
     */
    private function soumettre($sql, $params = [])
    {
        $this->requetePdo = $this->pdo->prepare($sql);
        $this->requetePdo->execute($params);
    }


    /**
     * Obtenir un jeu d'enregistrement groupé (par première colonne sélectionnée)
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return array Tableau associatif (colonne de groupage) contenant des tableaux
     *                  des données groupées
     */
    protected function lire($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        // if ($groupe !== PDO::FETCH_GROUP) {
        //     return $this->requetePdo->fetchAll($params);
        // }
        return $this->requetePdo->fetchAll();
    }

    /**
     * Obtenir un entregistrement
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return array Tableau associatif ayant seulement un entregistrement cherché
     */
    protected function lireUn($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->requetePdo->fetch();
    }

    /**
     * Insèrer un enregistrement
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return int Identifiant (auto increment) du dernier enregistrement inséré
     */
    protected function creer($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->pdo->lastInsertId();
    }

    /**
     * Modifier un enregistrement
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return int Nombre d'enregistrements affectés
     */
    protected function modifier($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->requetePdo->rowCount();
    }

    /**
     * Supprimer un enregistrement
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return int Nombre d'enregistrements affectés
     */
    protected function supprimer($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->requetePdo->rowCount();
    }
}
>>>>>>> monvino/master
