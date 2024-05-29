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
-- Table structure for table `log_table`
--

DROP TABLE IF EXISTS `log_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_table` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) DEFAULT NULL,
  `sqls` text,
  `value` text,
  `times` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_table`
--

LOCK TABLES `log_table` WRITE;
/*!40000 ALTER TABLE `log_table` DISABLE KEYS */;
INSERT INTO `log_table` VALUES (1,'192.168.1.1','SELECT * FROM users','some_value','2024-02-15 11:24:58'),(2,'::ffff:127.0.0.1','sql','11','2024-02-15 12:50:22'),(3,'::ffff:127.0.0.1','UPDATE project_table SET del=?, project_code = ?, service_code = ?, manage_code = ?, project_name = ?, new_inspectiontype = ?, old_inspectiontype = ?, open_date = ?, relative_comp = ?, comp1 = ?, part1 = ?, manager1 = ?, manager1_phone = ?, comp2 = ?, part2 = ?, manager2 = ?, manager2_phone = ?, pentest = ?, source_code = ?, infra = ?, note = ?, check1 = ?, check2 = ?, check3 = ?, check4 = ?, check5 = ?, check6 = ?, check7 = ?, old_manage_code = ?, old_project = ? WHERE seq = ?','[\"false\",\"P016\",\"S016\",\"\",\"ㅎㅇㅂ1111111\",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,86]','2024-02-15 12:58:59'),(4,'::ffff:127.0.0.1','UPDATE project_table SET del=?, project_code = ?, service_code = ?, manage_code = ?, project_name = ?, new_inspectiontype = ?, old_inspectiontype = ?, open_date = ?, relative_comp = ?, comp1 = ?, part1 = ?, manager1 = ?, manager1_phone = ?, comp2 = ?, part2 = ?, manager2 = ?, manager2_phone = ?, pentest = ?, source_code = ?, infra = ?, note = ?, check1 = ?, check2 = ?, check3 = ?, check4 = ?, check5 = ?, check6 = ?, check7 = ?, old_manage_code = ?, old_project = ? WHERE seq = ?','[\"false\",\"P016\",\"S016\",\"\",\"ㅎㅇㅂ\",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,86]','2024-02-15 14:02:38'),(5,'::ffff:127.0.0.1','UPDATE project_table SET del=?, project_code = ?, service_code = ?, manage_code = ?, project_name = ?, new_inspectiontype = ?, old_inspectiontype = ?, open_date = ?, relative_comp = ?, comp1 = ?, part1 = ?, manager1 = ?, manager1_phone = ?, comp2 = ?, part2 = ?, manager2 = ?, manager2_phone = ?, pentest = ?, source_code = ?, infra = ?, note = ?, check1 = ?, check2 = ?, check3 = ?, check4 = ?, check5 = ?, check6 = ?, check7 = ?, old_manage_code = ?, old_project = ? WHERE seq = ?','[\"false\",\"P015\",\"S015\",\"A007\",\"24) 새로운 프로젝트\",\"A\",\"C\",\"2024.02.05\",\"관계사\",\"담당업체\",\"담당부서\",\"담당자\",\"010-1234-1234\",\"담당업체2\",\"담당부터\",\"담당자\",\"010-1234-1234\",\"TRUE\",\"TRUE\",\"TRUE\",\"\",\"TRUE\",\"TRUE\",\"TRUE\",\"TRUE\",\"TRUE\",\"TRUE\",\"TRUE\",\"\",\"TRUE\",85]','2024-02-15 16:10:52'),(6,'::ffff:127.0.0.1','UPDATE project_table SET del=?, project_code = ?, service_code = ?, manage_code = ?, project_name = ?, new_inspectiontype = ?, old_inspectiontype = ?, open_date = ?, relative_comp = ?, comp1 = ?, part1 = ?, manager1 = ?, manager1_phone = ?, comp2 = ?, part2 = ?, manager2 = ?, manager2_phone = ?, pentest = ?, source_code = ?, infra = ?, note = ?, check1 = ?, check2 = ?, check3 = ?, check4 = ?, check5 = ?, check6 = ?, check7 = ?, old_manage_code = ?, old_project = ? WHERE seq = ?','[\"true\",\"P016\",\"S016\",\"\",\"ㅎㅇㅂ\",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,86]','2024-02-15 16:20:00');
/*!40000 ALTER TABLE `log_table` ENABLE KEYS */;
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
