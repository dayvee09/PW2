-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 08 sep. 2022 à 19:40
-- Version du serveur :  10.4.19-MariaDB
-- Version de PHP : 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pw2`
--

-- --------------------------------------------------------

--
-- Structure de la table `vino__bouteille`
--

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

--
-- Déchargement des données de la table `vino__bouteille`
--

INSERT INTO `vino__bouteille` (`id`, `nom`, `image`, `code_saq`, `pays`, `description`, `prix_saq`, `url_saq`, `url_img`, `format`, `vino__type_id`, `millesime`, `personnalise`) VALUES
(1, 'Borsao Seleccion', '//s7d9.scene7.com/is/image/SAQ/10324623_is?$saq-rech-prod-gril$', '10324623', 'Espagne', 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 10324623', 11, 'https://www.saq.com/page/fr/saqcom/vin-rouge/borsao-seleccion/10324623', '//s7d9.scene7.com/is/image/SAQ/10324623_is?$saq-rech-prod-gril$', ' 750 ml', 1, 2000, 0),
(2, 'Monasterio de Las Vinas Gran Reserva', '//s7d9.scene7.com/is/image/SAQ/10359156_is?$saq-rech-prod-gril$', '10359156', 'Espagne', 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 10359156', 19, 'https://www.saq.com/page/fr/saqcom/vin-rouge/monasterio-de-las-vinas-gran-reserva/10359156', '//s7d9.scene7.com/is/image/SAQ/10359156_is?$saq-rech-prod-gril$', ' 750 ml', 1, 2000, 0),
(3, 'Castano Hecula', '//s7d9.scene7.com/is/image/SAQ/11676671_is?$saq-rech-prod-gril$', '11676671', 'Espagne', 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 11676671', 12, 'https://www.saq.com/page/fr/saqcom/vin-rouge/castano-hecula/11676671', '//s7d9.scene7.com/is/image/SAQ/11676671_is?$saq-rech-prod-gril$', ' 750 ml', 1, 2000, 0),
(4, 'Campo Viejo Tempranillo Rioja', '//s7d9.scene7.com/is/image/SAQ/11462446_is?$saq-rech-prod-gril$', '11462446', 'Espagne', 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 11462446', 14, 'https://www.saq.com/page/fr/saqcom/vin-rouge/campo-viejo-tempranillo-rioja/11462446', '//s7d9.scene7.com/is/image/SAQ/11462446_is?$saq-rech-prod-gril$', ' 750 ml', 1, 2000, 0),
(5, 'Bodegas Atalaya Laya 2017', '//s7d9.scene7.com/is/image/SAQ/12375942_is?$saq-rech-prod-gril$', '12375942', 'Espagne', 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 12375942', 17, 'https://www.saq.com/page/fr/saqcom/vin-rouge/bodegas-atalaya-laya-2017/12375942', '//s7d9.scene7.com/is/image/SAQ/12375942_is?$saq-rech-prod-gril$', ' 750 ml', 1, 2000, 0),
(6, 'Vin Vault Pinot Grigio', '//s7d9.scene7.com/is/image/SAQ/13467048_is?$saq-rech-prod-gril$', '13467048', 'États-Unis', 'Vin blanc\r\n         \r\n      \r\n      \r\n      États-Unis, 3 L\r\n      \r\n      \r\n      Code SAQ : 13467048', NULL, 'https://www.saq.com/page/fr/saqcom/vin-blanc/vin-vault-pinot-grigio/13467048', '//s7d9.scene7.com/is/image/SAQ/13467048_is?$saq-rech-prod-gril$', ' 3 L', 2, 2000, 0),
(7, 'Huber Riesling Engelsberg 2017', '//s7d9.scene7.com/is/image/SAQ/13675841_is?$saq-rech-prod-gril$', '13675841', 'Autriche', 'Vin blanc\r\n         \r\n      \r\n      \r\n      Autriche, 750 ml\r\n      \r\n      \r\n      Code SAQ : 13675841', 22, 'https://www.saq.com/page/fr/saqcom/vin-blanc/huber-riesling-engelsberg-2017/13675841', '//s7d9.scene7.com/is/image/SAQ/13675841_is?$saq-rech-prod-gril$', ' 750 ml', 2, 2000, 0),
(8, 'Dominio de Tares Estay Castilla y Léon 2015', '//s7d9.scene7.com/is/image/SAQ/13802571_is?$saq-rech-prod-gril$', '13802571', 'Espagne', 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 13802571', 18, 'https://www.saq.com/page/fr/saqcom/vin-rouge/dominio-de-tares-estay-castilla-y-leon-2015/13802571', '//s7d9.scene7.com/is/image/SAQ/13802571_is?$saq-rech-prod-gril$', ' 750 ml', 1, 2000, 0),
(9, 'Tessellae Old Vines Côtes du Roussillon 2016', '//s7d9.scene7.com/is/image/SAQ/12216562_is?$saq-rech-prod-gril$', '12216562', 'France', 'Vin rouge\r\n         \r\n      \r\n      \r\n      France, 750 ml\r\n      \r\n      \r\n      Code SAQ : 12216562', 21, 'https://www.saq.com/page/fr/saqcom/vin-rouge/tessellae-old-vines-cotes-du-roussillon-2016/12216562', '//s7d9.scene7.com/is/image/SAQ/12216562_is?$saq-rech-prod-gril$', ' 750 ml', 1, 2000, 0),
(10, 'Tenuta Il Falchetto Bricco Paradiso -... 2015', '//s7d9.scene7.com/is/image/SAQ/13637422_is?$saq-rech-prod-gril$', '13637422', 'Italie', 'Vin rouge\r\n         \r\n      \r\n      \r\n      Italie, 750 ml\r\n      \r\n      \r\n      Code SAQ : 13637422', 34, 'https://www.saq.com/page/fr/saqcom/vin-rouge/tenuta-il-falchetto-bricco-paradiso---barbera-dasti-superiore-docg-2015/13637422', '//s7d9.scene7.com/is/image/SAQ/13637422_is?$saq-rech-prod-gril$', ' 750 ml', 1, 2000, 0);

-- --------------------------------------------------------

--
-- Structure de la table `vino__bouteille_has_vino__cellier`
--

CREATE TABLE `vino__bouteille_has_vino__cellier` (
  `vino__bouteille_id` int(11) NOT NULL,
  `vino__cellier_id` int(11) NOT NULL,
  `quantite` int(11) DEFAULT NULL,
  `date_achat` date DEFAULT NULL,
  `garde_jusqua` varchar(200) DEFAULT NULL,
  `notes` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vino__bouteille_has_vino__cellier`
--

INSERT INTO `vino__bouteille_has_vino__cellier` (`vino__bouteille_id`, `vino__cellier_id`, `quantite`, `date_achat`, `garde_jusqua`, `notes`) VALUES
(1, 1, 5, '2022-01-16', '2023', 'Borsao'),
(1, 2, 5, '2022-01-16', '2023', 'Borsao'),
(2, 1, 7, '2022-01-26', '2024', 'Monasterio'),
(2, 2, 7, '2022-01-26', '2024', 'Monasterio'),
(3, 1, 1, '2022-02-10', '2024', 'Castano'),
(3, 2, 1, '2022-02-10', '2024', 'Castano'),
(4, 1, 3, '2022-02-11', '2024', 'Campo'),
(4, 2, 3, '2022-02-11', '2024', 'Campo'),
(5, 1, 5, '2022-02-15', '2029', 'Bodegas'),
(5, 2, 5, '2022-02-15', '2029', 'Bodegas'),
(6, 1, 2, '2022-02-16', '2030', 'Pinot'),
(6, 2, 2, '2022-02-16', '2030', 'Pinot'),
(7, 1, 6, '2022-02-19', '2024', 'Huber'),
(7, 2, 6, '2022-02-19', '2024', 'Huber'),
(8, 1, 8, '2022-02-22', '2044', 'Dominio'),
(8, 2, 8, '2022-02-22', '2044', 'Dominio'),
(9, 1, 14, '2022-03-19', '2024', 'Tessellae'),
(9, 2, 14, '2022-03-19', '2024', 'Tessellae'),
(10, 9, 20, '2022-07-26', '2024', 'Tenuta');

-- --------------------------------------------------------

--
-- Structure de la table `vino__cellier`
--

CREATE TABLE `vino__cellier` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `vino__utilisateur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vino__cellier`
--

INSERT INTO `vino__cellier` (`id`, `nom`, `vino__utilisateur_id`) VALUES
(1, 'Admin', 1),
(2, 'chalet #1 de Sebastien', 2),
(3, 'chalet #2 de Sebastien', 2),
(4, 'chalet #3 de Sebastien', 2),
(5, 'chalet #4 de Sebastien', 2),
(6, 'chalet #5 de Sebastien', 2),
(7, 'chalet #6 de Sebastien', 2),
(8, 'chalet #7 de Sebastien ', 2),
(9, 'chalet de Bruno', 3);

-- --------------------------------------------------------

--
-- Structure de la table `vino__favoris`
--

CREATE TABLE `vino__favoris` (
  `vino__bouteille_id` int(11) NOT NULL,
  `vino__utilisateur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `vino__type`
--

CREATE TABLE `vino__type` (
  `id` int(11) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vino__type`
--

INSERT INTO `vino__type` (`id`, `type`) VALUES
(1, 'Vin rouge'),
(2, 'Vin blanc'),
(3, 'Vin rose');

-- --------------------------------------------------------

--
-- Structure de la table `vino__utilisateur`
--

CREATE TABLE `vino__utilisateur` (
  `id` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `mdp` varchar(45) DEFAULT NULL,
  `privilege` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `vino__utilisateur`
--

INSERT INTO `vino__utilisateur` (`id`, `nom`, `email`, `mdp`, `privilege`) VALUES
(1, 'Admin', 'davids09@hotmail.com', NULL, 'admin'),
(2, 'Sebastien', 's.gedeon@hotmail.fr', NULL, 'utilisateur'),
(3, 'Bruno', 'bruno@email.com', NULL, 'utilisateur');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `vino__bouteille`
--
ALTER TABLE `vino__bouteille`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vino__bouteille_vino__type1_idx` (`vino__type_id`);

--
-- Index pour la table `vino__bouteille_has_vino__cellier`
--
ALTER TABLE `vino__bouteille_has_vino__cellier`
  ADD PRIMARY KEY (`vino__bouteille_id`,`vino__cellier_id`),
  ADD KEY `fk_vino__bouteille_has_vino__cellier_vino__cellier1_idx` (`vino__cellier_id`),
  ADD KEY `fk_vino__bouteille_has_vino__cellier_vino__bouteille1_idx` (`vino__bouteille_id`);

--
-- Index pour la table `vino__cellier`
--
ALTER TABLE `vino__cellier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vino__cellier_vino__utilisateur1_idx` (`vino__utilisateur_id`);

--
-- Index pour la table `vino__favoris`
--
ALTER TABLE `vino__favoris`
  ADD PRIMARY KEY (`vino__bouteille_id`,`vino__utilisateur_id`),
  ADD KEY `vino__utilisateur_id` (`vino__utilisateur_id`);

--
-- Index pour la table `vino__type`
--
ALTER TABLE `vino__type`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vino__utilisateur`
--
ALTER TABLE `vino__utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `vino__bouteille`
--
ALTER TABLE `vino__bouteille`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `vino__cellier`
--
ALTER TABLE `vino__cellier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;


--
-- AUTO_INCREMENT pour la table `vino__utilisateur`
--
ALTER TABLE `vino__utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `vino__bouteille`
--
ALTER TABLE `vino__bouteille`
  ADD CONSTRAINT `fk_vino__bouteille_vino__type1` FOREIGN KEY (`vino__type_id`) REFERENCES `vino__type` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `vino__bouteille_has_vino__cellier`
--
ALTER TABLE `vino__bouteille_has_vino__cellier`
  ADD CONSTRAINT `fk_vino__bouteille_has_vino__cellier_vino__bouteille1` FOREIGN KEY (`vino__bouteille_id`) REFERENCES `vino__bouteille` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vino__bouteille_has_vino__cellier_vino__cellier1` FOREIGN KEY (`vino__cellier_id`) REFERENCES `vino__cellier` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `vino__cellier`
--
ALTER TABLE `vino__cellier`
  ADD CONSTRAINT `fk_vino__cellier_vino__utilisateur1` FOREIGN KEY (`vino__utilisateur_id`) REFERENCES `vino__utilisateur` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `vino__favoris`
--
ALTER TABLE `vino__favoris`
  ADD CONSTRAINT `vino__favoris_ibfk_1` FOREIGN KEY (`vino__bouteille_id`) REFERENCES `vino__bouteille` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `vino__favoris_ibfk_2` FOREIGN KEY (`vino__utilisateur_id`) REFERENCES `vino__utilisateur` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
