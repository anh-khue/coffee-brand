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
  PRIMARY KEY (`id`),
  UNIQUE KEY `ingredient_UNIQUE` (`ingredient`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (9,'Apple Syrup'),(8,'Blueberry Syrup'),(12,'Chocolate'),(5,'Cocoa'),(1,'Coffee'),(6,'Condensed Milk'),(13,'Cream'),(4,'Matcha'),(2,'Milk'),(15,'Milo'),(11,'Mint Syrup'),(14,'Oreo'),(17,'Peach'),(7,'Soda'),(10,'Strawberry Syrup'),(3,'Sugar'),(16,'Tea');
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
  `type_id` int(11) NOT NULL DEFAULT '1',
  `created_date` datetime DEFAULT NULL,
  `image_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sustenance_type_idx` (`type_id`),
  CONSTRAINT `fk_sustenance_type` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustenance`
--

LOCK TABLES `sustenance` WRITE;
/*!40000 ALTER TABLE `sustenance` DISABLE KEYS */;
INSERT INTO `sustenance` VALUES (1,'Black Coffee',18000,0,1,3,'2018-03-08 14:12:25','1ggCyyLjCu6yqDBbLnZllOpgkFmSFySmw'),(2,'Milk Coffee',19000,0,1,3,'2018-03-08 14:12:25','1ggCyyLjCu6yqDBbLnZllOpgkFmSFySmw'),(3,'Peach Tea',23000,0,1,5,'2018-03-08 14:12:25','1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m'),(4,'Milk Tea',18000,0,1,5,'2018-03-08 14:12:25','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(5,'Cream Puffin',25000,0,4,1,'2018-03-08 14:12:25','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(110,'Cappuccino',30000,10,1,3,'2018-03-15 22:17:49','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(111,'Matcha Latte',32000,0,1,3,'2018-03-15 22:17:49','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(112,'Mint Soda',28000,0,1,4,'2018-03-15 22:17:49','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(113,'Blue Soda',30000,5,1,4,'2018-03-15 22:17:49','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(114,'Strawberry Soda',28000,0,1,4,'2018-03-15 22:17:49','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(115,'Milk Shake',25000,0,1,6,'2018-03-15 22:17:49','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(123,'Espresso',22000,0,1,3,'2018-03-19 13:36:22','1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m'),(124,'Americano',25000,0,1,3,'2018-03-19 13:36:22','1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m'),(125,'Latte',30000,0,1,3,'2018-03-19 13:36:22','1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m'),(126,'Matcha Cheese Cake',38000,5,1,1,'2018-03-19 13:36:22','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(127,'Blueberry Cheese Cake',38000,5,1,1,'2018-03-19 13:36:22','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(128,'Cocoa Cheese Cake',38000,5,1,1,'2018-03-19 13:36:22','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(129,'Traditional Cheese Cake',32000,5,1,1,'2018-03-19 13:36:22','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(130,'Hotdog',35000,0,1,2,'2018-03-19 13:36:22','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(131,'Beef Hamburger',38000,0,1,2,'2018-03-19 13:36:22','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4'),(132,'Vietnamese Traditional Bread',25000,0,1,2,'2018-03-19 13:36:22','1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4');
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
INSERT INTO `sustenance_has_ingredient` VALUES (1,1),(3,1),(1,2),(2,2),(3,2),(6,2),(3,3),(16,3),(17,3),(2,4),(3,4),(16,4),(1,110),(2,110),(3,110),(6,110),(12,110),(2,111),(3,111),(4,111),(6,111),(3,112),(7,112),(11,112),(3,113),(7,113),(8,113),(11,113),(3,114),(7,114),(10,114),(2,115),(3,115),(6,115),(13,115);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (4,'Beverage'),(1,'Cake'),(3,'Coffee'),(6,'Milk'),(2,'Snack'),(5,'Tea');
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

-- Dump completed on 2018-03-21 13:16:27
