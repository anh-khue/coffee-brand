-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: catalog
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ingredient` varchar(45) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (1,'Coffee',NULL),(2,'Milk',NULL),(3,'Sugar',NULL),(4,'Matcha',NULL),(5,'Cocoa',NULL),(6,'Condensed Milk',NULL),(7,'Soda',NULL),(8,'Blueberry Syrup',NULL),(9,'Apple Syrup',NULL),(10,'Strawberry Syrup',NULL),(11,'Mint Syrup',NULL),(12,'Chocolate',NULL),(13,'Cream',NULL),(14,'Oreo',NULL),(15,'Milo',NULL),(16,'Tea',NULL),(17,'Peach',NULL);
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustenance`
--

DROP TABLE IF EXISTS `sustenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sustenance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `discount` float NOT NULL DEFAULT '0',
  `unit` int(11) NOT NULL DEFAULT '1',
  `type_id` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `image_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sustenance_type_idx` (`type_id`),
  CONSTRAINT `fk_sustenance_type` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustenance`
--

LOCK TABLES `sustenance` WRITE;
/*!40000 ALTER TABLE `sustenance` DISABLE KEYS */;
INSERT INTO `sustenance` VALUES (1,'Black Coffee',18000,0,1,3,NULL,NULL,NULL),(2,'Milk Coffee',19000,0,1,3,NULL,NULL,NULL),(3,'Peach Tea',23000,0,1,5,NULL,NULL,NULL),(4,'Milk Tea',18000,0,1,5,NULL,NULL,NULL),(5,'Cream Puffin',25000,0,4,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `sustenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustenance_has_ingredient`
--

DROP TABLE IF EXISTS `sustenance_has_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sustenance_has_ingredient` (
  `ingredient_id` int(11) NOT NULL,
  `sustenance_id` int(11) NOT NULL,
  PRIMARY KEY (`ingredient_id`,`sustenance_id`),
  KEY `fk_ingredient_has_sustenance_sustenance1_idx` (`sustenance_id`),
  KEY `fk_ingredient_has_sustenance_ingredient1_idx` (`ingredient_id`),
  CONSTRAINT `fk_ingredient_has_sustenance_ingredient1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ingredient_has_sustenance_sustenance1` FOREIGN KEY (`sustenance_id`) REFERENCES `sustenance` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustenance_has_ingredient`
--

LOCK TABLES `sustenance_has_ingredient` WRITE;
/*!40000 ALTER TABLE `sustenance_has_ingredient` DISABLE KEYS */;
INSERT INTO `sustenance_has_ingredient` VALUES (1,1),(3,1),(1,2),(2,2),(3,2),(6,2),(3,3),(16,3),(17,3),(2,4),(3,4),(16,4);
/*!40000 ALTER TABLE `sustenance_has_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Cake',NULL),(2,'Snack',NULL),(3,'Coffee',NULL),(4,'Beverage',NULL),(5,'Tea',NULL),(6,'Milk',NULL);
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-12  9:09:44
