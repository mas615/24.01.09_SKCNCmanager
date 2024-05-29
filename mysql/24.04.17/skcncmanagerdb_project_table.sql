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
-- Table structure for table `project_table`
--

DROP TABLE IF EXISTS `project_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_table` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `project_code` varchar(20) DEFAULT NULL,
  `service_code` varchar(20) DEFAULT NULL,
  `manage_code` varchar(20) DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `new_inspectiontype` varchar(10) DEFAULT NULL,
  `old_inspectiontype` varchar(10) DEFAULT NULL,
  `open_date` date DEFAULT NULL,
  `relative_comp` varchar(20) DEFAULT NULL,
  `comp1` varchar(20) DEFAULT NULL,
  `part1` varchar(20) DEFAULT NULL,
  `manager1` varchar(20) DEFAULT NULL,
  `manager1_phone` varchar(20) DEFAULT NULL,
  `comp2` varchar(20) DEFAULT NULL,
  `part2` varchar(20) DEFAULT NULL,
  `manager2` varchar(20) DEFAULT NULL,
  `manager2_phone` varchar(20) DEFAULT NULL,
  `pentest` varchar(5) DEFAULT NULL,
  `source_code` varchar(5) DEFAULT NULL,
  `infra` varchar(5) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `check1` varchar(5) DEFAULT NULL,
  `check2` varchar(5) DEFAULT NULL,
  `check3` varchar(5) DEFAULT NULL,
  `check4` varchar(5) DEFAULT NULL,
  `check5` varchar(5) DEFAULT NULL,
  `check6` varchar(5) DEFAULT NULL,
  `check7` varchar(5) DEFAULT NULL,
  `old_manage_code` varchar(20) DEFAULT NULL,
  `old_project` varchar(5) DEFAULT NULL,
  `del` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_table`
--

LOCK TABLES `project_table` WRITE;
/*!40000 ALTER TABLE `project_table` DISABLE KEYS */;
INSERT INTO `project_table` VALUES (67,'P000','S000','A000','크사테스트','A','A','2024-06-15','SK C&C','SK C&C','에코솔루션','홍길동','010-1234-5678','SK 쉴더스','EQST','김갑수','010-1234-5678','false','false','false','비고없음','false','false','false','false','false','false','false','','true','true'),(68,'P001','S001','B001','(\'24)두번째 프로젝트','B','A','1995-06-15','SK C&C','SK C&C','우리는한팀','김태풍','010-0000-0000','SK Shieldus','이사진','이서진','010-1212-1212','false','false','false','false','false','false','true','false','false','false','true','OLD','false','false'),(69,'P002','S002','C000','크사테스트','C','A','1995-06-15','<img src=x>\"<>\'','담업','담부','담당자','연락처','담업2','담부2','담당자2','연락처2','false','false','false','false','false','false','false','false','false','true','false','OLD','false','false'),(70,'P003','S003','E000','테스트용','E','A','1995-06-15','SKTEST','SKTEST','SKTEST','SKTEST','SKTEST','SKTEST','SKTEST','SKTEST','SKTEST','false','false','false','SKTEST','false','false','true','false','true','false','false','OLD','false','false'),(71,'P004','S004','E000','프로젝트명','E','A','1995-06-15','true','2','3','4','5','6','7','8','9','false','false','false','false','false','false','false','true','false','false','false','OLD','false','false'),(72,'P005','S005','A001','프로젝트','A','A','1995-06-15','ㅇ','ㅇ','ㅇ','ㅇ','ㅇ','ㅇ','ㅇ','ㅇ','ㅇ','false','false','false','false','false','false','true','false','false','false','false','OLD','false','false'),(73,'P006','S006','D000','(25)테스트용','D','A','1995-06-15','테스트용','테스트용','테스트용','테스트용','테스트용','테스트용','테스트용','테스트용','테스트용','false','false','false','false','false','true','false','false','false','false','false','OLD','false','false'),(74,'P007','S007','F000','(25)테스트용','F','A','1995-06-15','테스트용','테스트용','테스트용','테스트용','테스트용','테스트용','테스트용','테스트용','테스트용','false','false','true','비고스','true','false','true','false','false','false','false','OLD','false','false'),(75,'P008','S008','A002','(\'24) 개쩌는 프로젝트','A','3','2024-02-21','skcnc','총괄담당업체','총괄담당부서','총괄담당자','총괄연락처','실무','실무','실무','실무','false','false','true','오픈임박','false','false','false','false','false','false','false','A000','false','false'),(76,'P009','S009','B002','(\'24)1그룹공통프로젝트','B','2','2024-01-23','true','2','3','4','5','6','7','8','9','false','true','true','비고','false','false','true','false','false','false','false','OLD','false','false'),(77,'P010','S010','A000','(\'24)그룹2공통프로젝트','A','true','2024-01-01','asdf','asdf','sdaf','sadf','sdaf','sdf','sadf','sdf','sdaf','true','false','true','asdf','true','false','false','false','false','false','false','OLD','false','false'),(78,'P010','S010','A002','24) 새로운 프로젝트','A','C','2024-02-05','관계사','담당업체','담당부서','담당자','010-1234-1234','담당업체2','담당부터','담당자','010-1234-1234','true','true','true','','true','true','true','true','true','true','true','','true','false'),(79,'P010','S010','A002','프로젝트명','A','C','2024-02-15','d','d','d','d','d','d','d','d','d','true','true','true','','true','true','true','true','true','true','true','dd','true','false'),(80,'P011','P011','D001','D의 새로운 프로젝트','D','B','2024-02-15','ㅇ','ㅇ','ㅇ','ㅇ','ㅇ','ㅇ','ㅇ','ㅇ',NULL,'true','true','true','ㅇ','true','true','true','true','true','true','true','ㅇ','true','false'),(81,'P011','S011','A003','A의 새로운프로젝트','A','C','2024-02-12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(82,'P012','S012','A004','A의 4번쨰 프로젝트','A','A','2024-02-20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(83,'P013','S013','A005','A의 5번째 프로젝트','A',NULL,'2024-02-15',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(84,'P014','S014','A006','프로젝트명','A','C','2024-02-15','d','d','d','d','d','d','d','d','d','TRUE','TRUE','TRUE','','TRUE','TRUE','TRUE','TRUE','TRUE','TRUE','TRUE','dd','TRUE','false'),(85,'P015','S015','A007','24) 새로운 프로젝트','A','C','2024-02-05','관계사','담당업체','담당부서','담당자','010-1234-1234','담당업체2','담당부터','담당자','010-1234-1234','TRUE','TRUE','TRUE','','TRUE','TRUE','TRUE','TRUE','TRUE','TRUE','TRUE','','TRUE','false'),(86,'P016','S016','','ㅎㅇㅂ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'true'),(87,'P017','S017','A008','24.02.16 테스트','A','A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(88,'P018','S018','A009','1','A','B','2024-03-12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(89,'P019','S019','A010','A의 10번째 프로젝트','A','B','2024-03-07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(90,'P020','S020','A011','A의 11번째 데이터 및 null 설정','A','A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(91,'P021','S021','A012','A의 12번째 프로젝트','A','C','2024-04-12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'true','true','true',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(92,'P022','S022','A013','A의 13번째 프로젝트','A','A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(93,'P023','S023','A014','A의 14번째 프로젝트','A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(94,'P024','S024','A015','15번째','A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(95,'P025','S025','B003','B의 3번째 프로젝트','B',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(96,'P026','S026','A016','A의 16번째 프로젝트','A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false'),(97,'P027','S027','A017','A의 17번째 프로젝트 테스트용','A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'false');
/*!40000 ALTER TABLE `project_table` ENABLE KEYS */;
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
