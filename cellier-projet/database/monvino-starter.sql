-- Mon Vino — starter database (generic demo data, safe to share)
-- Database name: pw2 (MariaDB / MySQL 10.x)
--
-- Import:
--   mysql -u root -p -e "CREATE DATABASE pw2 CHARACTER SET utf8mb4;"
--   mysql -u root -p pw2 < cellier-projet/database/monvino-starter.sql
--
-- After import, set the admin row email to match your AWS Cognito admin account:
--   UPDATE vino__utilisateur SET email = 'you@example.com' WHERE id = 1;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- Table `vino__type`
-- --------------------------------------------------------

CREATE TABLE `vino__type` (
  `id` int(11) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `vino__type` (`id`, `type`) VALUES
(1, 'Vin rouge'),
(2, 'Vin blanc'),
(3, 'Vin rose');

-- --------------------------------------------------------
-- Table `vino__utilisateur`
-- --------------------------------------------------------

CREATE TABLE `vino__utilisateur` (
  `id` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `mdp` varchar(45) DEFAULT NULL,
  `privilege` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `vino__utilisateur` (`id`, `nom`, `email`, `mdp`, `privilege`) VALUES
(1, 'Administrateur', 'admin@example.com', NULL, 'admin'),
(2, 'Utilisateur démo', 'demo@example.com', NULL, 'utilisateur');

-- --------------------------------------------------------
-- Table `vino__cellier`
-- Cellier #1 = catalogue SAQ (réservé admin, voir SaqModele / VinsModele)
-- --------------------------------------------------------

CREATE TABLE `vino__cellier` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `vino__utilisateur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `vino__cellier` (`id`, `nom`, `vino__utilisateur_id`) VALUES
(1, 'Catalogue SAQ', 1),
(2, 'Mon cellier démo', 2);

-- --------------------------------------------------------
-- Table `vino__bouteille`
-- Échantillon de bouteilles SAQ (données publiques) pour tests et autocomplete
-- --------------------------------------------------------

CREATE TABLE `vino__bouteille` (
  `id` int(11) NOT NULL,
  `nom` varchar(200) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `code_saq` varchar(50) DEFAULT NULL,
  `pays` varchar(50) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `prix_saq` float DEFAULT NULL,
  `url_saq` varchar(200) DEFAULT NULL,
  `url_img` varchar(200) DEFAULT NULL,
  `format` varchar(20) DEFAULT NULL,
  `vino__type_id` int(11) NOT NULL,
  `millesime` int(11) DEFAULT NULL,
  `personnalise` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `vino__bouteille` (`id`, `nom`, `image`, `code_saq`, `pays`, `description`, `prix_saq`, `url_saq`, `url_img`, `format`, `vino__type_id`, `millesime`, `personnalise`) VALUES
(1, 'Borsao Seleccion', 'https://www.saq.com/media/catalog/product/1/0/10324623-1_1602104750.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '10324623', 'Espagne', 'Vin rouge — Espagne, 750 ml — Code SAQ : 10324623', 11, 'https://www.saq.com/page/fr/saqcom/vin-rouge/borsao-seleccion/10324623', '//s7d9.scene7.com/is/image/SAQ/10324623_is?$saq-rech-prod-gril$', '750 ml', 1, 2000, 0),
(2, 'Monasterio de Las Vinas Gran Reserva', 'https://www.saq.com/media/catalog/product/1/0/10359156-1_1580596511.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '10359156', 'Espagne', 'Vin rouge — Espagne, 750 ml — Code SAQ : 10359156', 19, 'https://www.saq.com/page/fr/saqcom/vin-rouge/monasterio-de-las-vinas-gran-reserva/10359156', '//s7d9.scene7.com/is/image/SAQ/10359156_is?$saq-rech-prod-gril$', '750 ml', 1, 2000, 0),
(3, 'Castano Hecula', 'https://www.saq.com/media/catalog/product/1/1/11676671-1_1603295447.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '11676671', 'Espagne', 'Vin rouge — Espagne, 750 ml — Code SAQ : 11676671', 12, 'https://www.saq.com/page/fr/saqcom/vin-rouge/castano-hecula/11676671', '//s7d9.scene7.com/is/image/SAQ/11676671_is?$saq-rech-prod-gril$', '750 ml', 1, 2000, 0),
(4, 'Campo Viejo Tempranillo Rioja', 'https://www.saq.com/media/catalog/product/1/1/11462446-1_1644269154.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '11462446', 'Espagne', 'Vin rouge — Espagne, 750 ml — Code SAQ : 11462446', 14, 'https://www.saq.com/page/fr/saqcom/vin-rouge/campo-viejo-tempranillo-rioja/11462446', '//s7d9.scene7.com/is/image/SAQ/11462446_is?$saq-rech-prod-gril$', '750 ml', 1, 2000, 0),
(5, 'Huber Riesling Engelsberg 2017', 'https://www.saq.com/media/catalog/product/1/3/13675841-1_1578540323.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '13675841', 'Autriche', 'Vin blanc — Autriche, 750 ml — Code SAQ : 13675841', 22, 'https://www.saq.com/page/fr/saqcom/vin-blanc/huber-riesling-engelsberg-2017/13675841', '//s7d9.scene7.com/is/image/SAQ/13675841_is?$saq-rech-prod-gril$', '750 ml', 2, 2017, 0);

-- --------------------------------------------------------
-- Table `vino__bouteille_has_vino__cellier`
-- --------------------------------------------------------

CREATE TABLE `vino__bouteille_has_vino__cellier` (
  `vino__bouteille_id` int(11) NOT NULL,
  `vino__cellier_id` int(11) NOT NULL,
  `quantite` int(11) DEFAULT NULL,
  `date_achat` date DEFAULT NULL,
  `garde_jusqua` varchar(200) DEFAULT NULL,
  `notes` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `vino__bouteille_has_vino__cellier` (`vino__bouteille_id`, `vino__cellier_id`, `quantite`, `date_achat`, `garde_jusqua`, `notes`) VALUES
(1, 1, 1, '2024-01-15', '2026', 'Catalogue SAQ'),
(2, 1, 1, '2024-01-15', '2026', 'Catalogue SAQ'),
(3, 1, 1, '2024-01-15', '2026', 'Catalogue SAQ'),
(4, 1, 1, '2024-01-15', '2026', 'Catalogue SAQ'),
(5, 1, 1, '2024-01-15', '2026', 'Catalogue SAQ'),
(1, 2, 2, '2024-06-01', '2026', 'Démo'),
(3, 2, 1, '2024-06-01', '2027', 'Démo');

-- --------------------------------------------------------
-- Table `vino__favoris`
-- --------------------------------------------------------

CREATE TABLE `vino__favoris` (
  `vino__bouteille_id` int(11) NOT NULL,
  `vino__utilisateur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Indexes
-- --------------------------------------------------------

ALTER TABLE `vino__bouteille`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vino__bouteille_vino__type1_idx` (`vino__type_id`);

ALTER TABLE `vino__bouteille_has_vino__cellier`
  ADD PRIMARY KEY (`vino__bouteille_id`,`vino__cellier_id`),
  ADD KEY `fk_vino__bouteille_has_vino__cellier_vino__cellier1_idx` (`vino__cellier_id`),
  ADD KEY `fk_vino__bouteille_has_vino__cellier_vino__bouteille1_idx` (`vino__bouteille_id`);

ALTER TABLE `vino__cellier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vino__cellier_vino__utilisateur1_idx` (`vino__utilisateur_id`);

ALTER TABLE `vino__favoris`
  ADD PRIMARY KEY (`vino__bouteille_id`,`vino__utilisateur_id`),
  ADD KEY `vino__utilisateur_id` (`vino__utilisateur_id`);

ALTER TABLE `vino__type`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `vino__utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

-- --------------------------------------------------------
-- AUTO_INCREMENT
-- --------------------------------------------------------

ALTER TABLE `vino__bouteille`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `vino__cellier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `vino__utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- --------------------------------------------------------
-- Foreign keys
-- --------------------------------------------------------

ALTER TABLE `vino__bouteille`
  ADD CONSTRAINT `fk_vino__bouteille_vino__type1` FOREIGN KEY (`vino__type_id`) REFERENCES `vino__type` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `vino__bouteille_has_vino__cellier`
  ADD CONSTRAINT `fk_vino__bouteille_has_vino__cellier_vino__bouteille1` FOREIGN KEY (`vino__bouteille_id`) REFERENCES `vino__bouteille` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vino__bouteille_has_vino__cellier_vino__cellier1` FOREIGN KEY (`vino__cellier_id`) REFERENCES `vino__cellier` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `vino__cellier`
  ADD CONSTRAINT `fk_vino__cellier_vino__utilisateur1` FOREIGN KEY (`vino__utilisateur_id`) REFERENCES `vino__utilisateur` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `vino__favoris`
  ADD CONSTRAINT `vino__favoris_ibfk_1` FOREIGN KEY (`vino__bouteille_id`) REFERENCES `vino__bouteille` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `vino__favoris_ibfk_2` FOREIGN KEY (`vino__utilisateur_id`) REFERENCES `vino__utilisateur` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
