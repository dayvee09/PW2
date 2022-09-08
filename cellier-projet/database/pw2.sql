-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 08 sep. 2022 à 19:17
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
(10, 'Tenuta Il Falchetto Bricco Paradiso -... 2015', '//s7d9.scene7.com/is/image/SAQ/13637422_is?$saq-rech-prod-gril$', '13637422', 'Italie', 'Vin rouge\r\n         \r\n      \r\n      \r\n      Italie, 750 ml\r\n      \r\n      \r\n      Code SAQ : 13637422', 34, 'https://www.saq.com/page/fr/saqcom/vin-rouge/tenuta-il-falchetto-bricco-paradiso---barbera-dasti-superiore-docg-2015/13637422', '//s7d9.scene7.com/is/image/SAQ/13637422_is?$saq-rech-prod-gril$', ' 750 ml', 1, 2000, 0),
(11, 'Abreu Las Posadas North Coast 2012', 'https://www.saq.com/media/catalog/product/1/3/13319096-1_1625772640.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '13319096', 'États-Unis', 'Vin rouge | 750 ml | États-Unis', 967, 'https://www.saq.com/fr/13319096', 'https://www.saq.com/media/catalog/product/1/3/13319096-1_1625772640.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(12, 'Abreu Rothwell Hyde St. Helena 2012', 'https://www.saq.com/media/catalog/product/1/3/13004633-1_1581375941.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '13004633', 'États-Unis', 'Vin rouge | 750 ml | États-Unis', 254, 'https://www.saq.com/fr/13004633', 'https://www.saq.com/media/catalog/product/1/3/13004633-1_1581375941.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(13, 'Abreu Thorevilos Napa Valley 2012', 'https://www.saq.com/media/wysiwyg/placeholder/category/06.png', '13319168', 'États-Unis', 'Vin rouge | 750 ml | États-Unis', 967, 'https://www.saq.com/fr/13319168', 'https://www.saq.com/media/wysiwyg/placeholder/category/06.png', '750 ml', 1, 2000, 0),
(14, 'Accolade Wines Batch X Shiraz 2016', 'https://www.saq.com/media/catalog/product/1/3/13879923-1_1578544524.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '13879923', 'Australie', 'Vin rouge | 750 ml | Australie', 20, 'https://www.saq.com/fr/13879923', 'https://www.saq.com/media/catalog/product/1/3/13879923-1_1578544524.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(15, 'Adaras Calizo Almansa 2020', 'https://www.saq.com/media/catalog/product/1/4/14134368-1_1578552318.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '14134368', 'Espagne', 'Vin rouge | 750 ml | Espagne', 18, 'https://www.saq.com/fr/14134368', 'https://www.saq.com/media/catalog/product/1/4/14134368-1_1578552318.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(16, 'Adega De Pegões Colheita Seleccionada 2016', 'https://www.saq.com/media/catalog/product/1/3/13679892-1_1578540618.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '13679892', 'Portugal', 'Vin rouge | 750 ml | Portugal', 18, 'https://www.saq.com/fr/13679892', 'https://www.saq.com/media/catalog/product/1/3/13679892-1_1578540618.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(17, 'Adega de Penalva Dão', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/fg_small.png?width=20&height=20', '13746485', 'Portugal', 'Vin rouge | 750 ml | Portugal', 12, 'https://www.saq.com/fr/13746485', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/fg_small.png?width=20&height=20', '750 ml', 1, 2000, 0),
(18, 'AdegaMãe Pinot Noir Lisboa 2018', 'https://www.saq.com/media/catalog/product/1/3/13568455-1_1634762136.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '13568455', 'Portugal', 'Vin rouge | 750 ml | Portugal', 23, 'https://www.saq.com/fr/13568455', 'https://www.saq.com/media/catalog/product/1/3/13568455-1_1634762136.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(19, 'Agiorgitiko Natur Domaine Tetramythos 2019', 'https://www.saq.com/media/catalog/product/1/2/12178957-1_1659973535.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '12178957', 'Grèce', 'Vin rouge | 750 ml | Grèce', 18, 'https://www.saq.com/fr/12178957', 'https://www.saq.com/media/catalog/product/1/2/12178957-1_1659973535.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(20, 'Aglianico Donnachiara Irpinia 2018', 'https://www.saq.com/media/catalog/product/1/2/12001852-1_1580658610.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '12001852', 'Italie', 'Vin rouge | 750 ml | Italie', 23, 'https://www.saq.com/fr/12001852', 'https://www.saq.com/media/catalog/product/1/2/12001852-1_1580658610.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(21, 'Agnès Paquet Auxey-Duresses 2020', 'https://www.saq.com/media/catalog/product/1/1/11510292-1_1661216134.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '11510292', 'France', 'Vin rouge | 750 ml | France', 45, 'https://www.saq.com/fr/11510292', 'https://www.saq.com/media/catalog/product/1/1/11510292-1_1661216134.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(22, 'Agnes Paquet Bourgogne Pinot noir 2019', 'https://www.saq.com/media/catalog/product/1/1/11510268-1_1580622325.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '11510268', 'France', 'Vin rouge | 750 ml | France', 30, 'https://www.saq.com/fr/11510268', 'https://www.saq.com/media/catalog/product/1/1/11510268-1_1580622325.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(23, 'Agostino Wines Uma Mendoza 2021', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/fg_small.png?width=20&height=20', '14501068', 'Argentine', 'Vin rouge | 750 ml | Argentine', 12, 'https://www.saq.com/fr/14501068', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/fg_small.png?width=20&height=20', '750 ml', 1, 2000, 0),
(24, 'Agricola Falset-Marca Ètim El Viatge Montsant 2019', 'https://www.saq.com/media/catalog/product/1/3/13800752-1_1578542425.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '13800752', 'Espagne', 'Vin rouge | 750 ml | Espagne', 19, 'https://www.saq.com/fr/13800752', 'https://www.saq.com/media/catalog/product/1/3/13800752-1_1578542425.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(25, 'Agro Turistica Marella Podere Marella Fiammetta Sangiovese 2018', 'https://www.saq.com/media/catalog/product/1/3/13675496-1_1578540321.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '13675496', 'Italie', 'Vin rouge | 750 ml | Italie', 24, 'https://www.saq.com/fr/13675496', 'https://www.saq.com/media/catalog/product/1/3/13675496-1_1578540321.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(26, 'Ah-So Red Navarra', 'https://www.saq.com/media/catalog/product/1/4/14715445-1_1623705128.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '14715445', 'Espagne', 'Vin rouge | 250 ml | Espagne', 6, 'https://www.saq.com/fr/14715445', 'https://www.saq.com/media/catalog/product/1/4/14715445-1_1623705128.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '250 ml', 1, 2000, 0),
(27, 'Akarua Rua Pinot Noir 2021', 'https://www.saq.com/media/catalog/product/1/2/12205100-1_1650453034.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '12205100', 'Nouvelle-Zélande', 'Vin rouge | 750 ml | Nouvelle-Zélande', 28, 'https://www.saq.com/fr/12205100', 'https://www.saq.com/media/catalog/product/1/2/12205100-1_1650453034.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(28, 'Al di l? del Fiume Dagamo Colli Bolognesi 2021', 'https://www.saq.com/media/catalog/product/1/4/14460331-1_1590004537.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '14460331', 'Italie', 'Vin rouge | 750 ml | Italie', 32, 'https://www.saq.com/fr/14460331', 'https://www.saq.com/media/catalog/product/1/4/14460331-1_1590004537.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(29, 'Alain Brumont Madiran Tour Bouscassé 2019', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/ac_small.png?width=20&height=20', '12284303', 'France', 'Vin rouge | 750 ml | France', 18, 'https://www.saq.com/fr/12284303', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/ac_small.png?width=20&height=20', '750 ml', 1, 2000, 0),
(30, 'Alain Jaume Côtes du Rhône Grand Veneur 2019', 'https://www.saq.com/media/catalog/product/1/4/14278839-1_1630686035.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '14278839', 'France', 'Vin rouge | 750 ml | France', 19, 'https://www.saq.com/fr/14278839', 'https://www.saq.com/media/catalog/product/1/4/14278839-1_1630686035.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(31, 'Alain Lorieux Chinon Expression 2019', 'https://www.saq.com/media/catalog/product/8/7/873257-1_1629320456.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '873257', 'France', 'Vin rouge | 750 ml | France', 19, 'https://www.saq.com/fr/873257', 'https://www.saq.com/media/catalog/product/8/7/873257-1_1629320456.png?quality=80&fit=bounds&height=166&width=111&canvas=111:166', '750 ml', 1, 2000, 0),
(32, 'Alamos Seleccion Malbec Mendoza 2018', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/ac_small.png?width=20&height=20', '11015726', 'Argentine', 'Vin rouge | 750 ml | Argentine', 17, 'https://www.saq.com/fr/11015726', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/ac_small.png?width=20&height=20', '750 ml', 1, 2000, 0),
(33, 'Albert Bichot Beaujolais Villages Mr No Sulfite', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/flg_small.png?width=20&height=20', '14879546', 'France', 'Vin rouge | 750 ml | France', 15, 'https://www.saq.com/fr/14879546', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/flg_small.png?width=20&height=20', '750 ml', 1, 2000, 0),
(34, 'Albert Bichot Bourgogne Vieilles Vignes', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/flg_small.png?width=20&height=20', '10667474', 'France', 'Vin rouge | 750 ml | France', 22, 'https://www.saq.com/fr/10667474', 'https://www.saq.com/media/wysiwyg/product_tags/pastille_gout/flg_small.png?width=20&height=20', '750 ml', 1, 2000, 0);

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
(10, 9, 20, '2022-07-26', '2024', 'Tenuta'),
(11, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(12, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(13, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(14, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(15, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(16, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(17, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(18, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(19, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(20, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(21, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(22, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(23, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(24, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(25, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(26, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(27, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(28, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(29, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(30, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(31, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(32, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(33, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ'),
(34, 1, 1, '2000-01-01', '2023', 'Vin de la SAQ');

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
(9, 'chalet de Bruno', 2);

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
(2, 'Vin blanc');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `vino__cellier`
--
ALTER TABLE `vino__cellier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `vino__utilisateur`
--
ALTER TABLE `vino__utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
