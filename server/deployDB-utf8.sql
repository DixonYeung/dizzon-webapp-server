-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: clinic
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consultation_record`
--

DROP TABLE IF EXISTS `consultation_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultation_record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctor_name` varchar(50) NOT NULL,
  `patient_name` varchar(50) NOT NULL,
  `diagnosis` varchar(255) NOT NULL,
  `medication` varchar(255) NOT NULL,
  `consultation_fee` int DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `follow_up` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultation_record`
--

LOCK TABLES `consultation_record` WRITE;
/*!40000 ALTER TABLE `consultation_record` DISABLE KEYS */;
INSERT INTO `consultation_record` VALUES (1,'Doctor Chan','Patient 1','bone fracture','plaster cast',500,'2021-03-13 01:11:45',1),(2,'Doctor Chan','Patient 2','headache','panadol',400,'2021-03-13 01:24:19',1),(3,'Doctor Lee','Patient Anna','stomach ache','stomach pills',200,'2011-12-18 13:17:17',0),(4,'Doctor Wong','Patient Jacky Wu','headache','headache pills',200,'2011-12-26 13:17:17',0),(5,'Doctor Lee Wing Ying','Patient Lam Cheuk Hin','cut wound','bandage',100,'2012-12-18 13:17:17',1),(6,'Doctor Chan','Patient Panda','Tooth Problem','tooth treatment',300,'2019-10-10 13:00:00',1),(7,'Doctor Doom','Patient Rogers Stevens','bone fracture','plaster bandage',500,'2018-05-12 18:30:15',1),(8,'Doctor Banners','Patient Scarlet','skin issues','skin medicine',200,'2021-03-15 00:25:15',0);
/*!40000 ALTER TABLE `consultation_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(512) NOT NULL,
  `clinicName` varchar(150) NOT NULL,
  `phoneNumber` varchar(8) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (1,'a@gmail.com','123','a','00000010','a, Po Lam'),(2,'clinic3@gmail.com','123','Clinic 3','00000003','Clinic 3, Sheung Yan House'),(3,'clinic4@gmail.com','123','Clinic 4','00000004','Clinic 4, Kowloon'),(4,'clinic5@gmail.com','123','Clinic 5','00000005','Clinic 5, HK'),(5,'clinic6@gmail.com','123','Clinic 6','00000006','Clinic 6, TKO'),(6,'clinic7@gmail.com','123','Clinic 7','00000007','Clinic 7, Tin Shui Wai'),(7,'clinic8@gmail.com','123','Clinic 8','00000008','Clinic 8, Sha Tin'),(8,'clinic9@gmail.com','123','Clinic 9','00000009','Clinic 9, Hum Chun Kok'),(9,'clinicA@gmail.com','123','Clinic A','00000001','Clinic A, HK'),(10,'clinicB@gmail.com','123','Clinic B','00000002','Clinic B, HK'),(11,'Clinic 11','123','Clinic 11','00000011','Clinic 11, Eleven Street'),(12,'clinic12@gmail.com','$2b$10$FgUeJy5GyA1Kvr7S8jyKleVGprfCrn5BNrY9DhJfaaT9MFcvHXyKi','Clinic 12','00000012','Clinic 12, Twelve Street'),(13,'clinicChoi13@gmail.com','$2b$10$LSjsy39eeWVeqwMn/LmbMOffL05h7IMHRWSJDPOyO.XiF/R29BJIW','Clinic Choi 13','61780013','Clinic 13, Choi, Po Lam'),(14,'clinic14@gmail.com','$2b$10$9AypBCvbCVZVnr6wqueehu2jYvxXnOuJ286F62g/WGUrlU7P4K32e','Clinic 14','00000014','Clinic 14, Fourteen Street'),(15,'clinic15@gmail.com','$2b$10$hNs4TKhGvCE2tD6KU07R7O5Vsjj9UcOxGwvFv5wo/B4.kUD5G9hJK','Clinic 15','00000015','Clinic 15, Fifteen Block'),(16,'clinic16@gmail.com','$2b$10$FAcAIwrP3nbFAkAAcaFZhe4eaIllVkIzW7YHOPC/KleGKxqaTCKce','Clinic 16','00000016','Clinic 16, sixteenth street');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-15  1:07:16
