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
