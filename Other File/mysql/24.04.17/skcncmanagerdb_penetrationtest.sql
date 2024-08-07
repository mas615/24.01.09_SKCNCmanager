-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: skcncmanagerdb
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `penetrationtest`
--

DROP TABLE IF EXISTS `penetrationtest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penetrationtest` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `manage_code` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `urlcount` int DEFAULT NULL,
  `pentester` varchar(20) DEFAULT NULL,
  `testcount` int DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `actdate` date DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `manday` int DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penetrationtest`
--

LOCK TABLES `penetrationtest` WRITE;
/*!40000 ALTER TABLE `penetrationtest` DISABLE KEYS */;
INSERT INTO `penetrationtest` VALUES (43,'A000','1','first.com',1,'마준영',0,'2024-01-16','2024-01-16',NULL,NULL,10),(44,'A000','2','first.com',1,'마준영',1,'2024-01-16','2024-01-16',NULL,'null',1),(45,'A000','2','first.com',1,'마준영',2,'2024-01-16','2024-01-16',NULL,'null',1),(46,'A000','3','first.com',1,'마준영',3,'2024-01-16','2024-01-16',NULL,'null',1),(47,'A001','1','naver.com\r\ngoogle.com',3,'마크주커버그',0,'2024-01-16','2024-01-16',NULL,NULL,3),(48,'B001','1','yahoo.com<br>paran.com',1,'마이클잭슨',0,'2024-01-16','2024-01-16',NULL,NULL,1),(49,'A000','2','first.com',1,'마준영',4,'2024-01-16','2024-01-16',NULL,'null',1),(50,'A000','2','first.com',1,'마준영',5,'2024-01-19','2024-01-19',NULL,'null',1),(51,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',1,'2024-01-19','2024-01-19',NULL,'null',1),(52,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',2,'2024-01-19','2024-01-19',NULL,'null',1),(53,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',3,'2024-01-19','2024-01-19',NULL,'null',1),(54,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',4,'2024-01-19','2024-01-19',NULL,'null',1),(55,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',5,'2024-01-19','2024-01-19',NULL,'null',1),(56,'A000','2','first.com',1,'마준영',6,'2024-01-19','2024-01-19',NULL,'null',1),(57,'A000','2','first.com',1,'마준영',7,'2024-01-19','2024-01-19',NULL,'null',1),(58,'A000','2','first.com',1,'마준영',8,'2024-01-19','2024-01-19',NULL,'null',1),(59,'A000','2','first.com',1,'마준영',9,'2024-01-19','2024-01-19',NULL,'null',1),(60,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',6,'2024-01-19','2024-01-19',NULL,'null',1),(61,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',7,'2024-01-19','2024-01-19',NULL,'null',1),(62,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',8,'2024-01-19','2024-01-19',NULL,'null',1),(63,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',9,'2024-01-19','2024-01-19',NULL,'null',1),(64,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',10,'2024-01-19','2024-01-19',NULL,'null',1),(65,'A000','2','first.com',1,'마준영',10,'2024-01-19','2024-01-19',NULL,'null',1),(66,'A000','2','first.com',1,'마준영',11,'2024-01-19','2024-01-19',NULL,'null',1),(67,'A000','2','first.com',1,'마준영',12,'2024-01-19','2024-01-19',NULL,'null',1),(68,'A000','2','first.com',1,'마준영',13,'2024-01-19','2024-01-19',NULL,'null',1),(69,'A000','2','first.com',1,'마준영',14,'2024-01-19','2024-01-19',NULL,'null',1),(70,'A000','2','first.com',1,'마준영',15,'2024-01-19','2024-01-19',NULL,'null',1),(71,'A000','2','first.com',1,'마준영',16,'2024-01-19','2024-01-19',NULL,'null',1),(72,'A000','2','first.com',1,'마준영',17,'2024-01-19','2024-01-19',NULL,'null',1),(73,'A000','2','first.com',1,'마준영',18,'2024-01-19','2024-01-19',NULL,'null',1),(74,'A000','2','first.com',1,'마준영',19,'2024-01-19','2024-01-19',NULL,'null',1),(75,'A000','2','first.com',1,'마준영',20,'2024-01-23','2024-01-23',NULL,'null',1),(76,'A000','2','first.com',1,'마준영',21,'2024-01-23','2024-01-23',NULL,'null',1),(77,'A000','2','first.com',1,'마준영',22,'2024-01-23','2024-01-23',NULL,'null',1),(78,'A000','2','first.com',1,'마준영',23,'2024-01-23','2024-01-23',NULL,'null',1),(79,'A000','2','first.com',1,'마준영',24,'2024-01-23','2024-01-23',NULL,'null',1),(80,'A000','2','first.com',1,'마준영',25,'2024-01-23','2024-01-23',NULL,'null',1),(81,'A000','2','first.com',1,'마준영',26,'2024-01-23','2024-01-23',NULL,'null',1),(82,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',11,'2024-01-23','2024-01-23',NULL,'null',1),(83,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',12,'2024-01-23','2024-01-23',NULL,'null',1),(84,'A001','2','naver.com\r\ngoogle.com',3,'마크주커버그',13,'2024-01-23','2024-01-23',NULL,'null',1),(85,'A002','1','sktest',1,'마준영',0,'2024-01-15','2024-01-23','2024-01-30','너무힘들었따',12),(86,'A002','2','sktest',1,'마준영',1,'2024-01-23','2024-01-23',NULL,'너무힘들었따',1),(87,'B002','1','그룹공통.com',1,'마준영',0,'2024-01-01','2024-01-23',NULL,NULL,3),(88,'B002','2','그룹공통.com',1,'마준영',1,'2024-01-23','2024-01-23',NULL,'null',1),(89,'B002','2','그룹공통.com',1,'마준영',2,'2024-01-23','2024-01-23',NULL,'null',1),(90,'B002','2','그룹공통.com',1,'마준영',3,'2024-01-23','2024-01-23',NULL,'null',1),(91,'B002','2','그룹공통.com',1,'마준영',4,'2024-01-23','2024-01-23',NULL,'null',1),(92,'C000','1','C.com',3,'C진단자',0,'2024-01-24','2024-01-24',NULL,NULL,23),(93,'A000','3','first.com',1,'마준영',27,'2024-01-24','2024-01-24',NULL,'null',1),(94,'A000','3','first.com',1,'마준영',28,'2024-01-24','2024-01-24',NULL,'null',1),(95,'A003','1','dsaf',2,'dddd',0,'2024-01-24','2024-01-24',NULL,'dd',NULL),(96,'A003','2','dsaf',2,'dddd',1,'2024-01-24','2024-01-24',NULL,'dd',1),(97,'A003','2','dsaf',2,'dddd',2,'2024-01-24','2024-01-24',NULL,'dd',1),(98,'A007','1','ㅇ',1,'마준영스',0,NULL,NULL,NULL,NULL,2),(99,'A004','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(100,'A005','1','1',2,'3',0,NULL,NULL,NULL,NULL,4),(101,'A006','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(102,'E000','1','test',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(103,'D000','1','test',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(104,'D001','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(105,'F000','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(106,'A008','1','test',NULL,NULL,0,'2024-02-16',NULL,NULL,NULL,NULL),(107,'A008','1','test',NULL,NULL,0,'2024-02-16',NULL,NULL,NULL,NULL),(108,'','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(109,'A010','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(110,'A009','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(111,'A011','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(112,'012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(113,'012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(114,'012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(115,'012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(116,'012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(117,'012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(118,'012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(119,'012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(120,'012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(121,'012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(122,'A012','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(123,'A013','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(124,'A014','1',NULL,NULL,NULL,0,'2024-03-05',NULL,NULL,NULL,NULL),(125,'A015','1',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(126,'A017','1',NULL,NULL,NULL,0,'0202-03-12',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `penetrationtest` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-17 13:30:51
