-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: slack
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

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
-- Table structure for table `channel_member`
--

DROP TABLE IF EXISTS `channel_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `channel_member` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `channel_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`channel_id`),
  KEY `channel_id` (`channel_id`),
  CONSTRAINT `channel_member_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `channel_member_ibfk_2` FOREIGN KEY (`channel_id`) REFERENCES `channels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel_member`
--

LOCK TABLES `channel_member` WRITE;
/*!40000 ALTER TABLE `channel_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `channel_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channels`
--

DROP TABLE IF EXISTS `channels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `channels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `public` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `channels_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channels`
--

LOCK TABLES `channels` WRITE;
/*!40000 ALTER TABLE `channels` DISABLE KEYS */;
INSERT INTO `channels` VALUES (1,'general',1,'2018-07-03 16:33:12','2018-07-03 16:33:12',1),(2,'xd',0,'2018-07-03 16:35:59','2018-07-03 16:35:59',1),(3,'general',1,'2018-07-03 23:03:41','2018-07-03 23:03:41',2),(4,'general',1,'2018-07-12 21:18:55','2018-07-12 21:18:55',3);
/*!40000 ALTER TABLE `channels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direct_messages`
--

DROP TABLE IF EXISTS `direct_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `direct_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  KEY `receiver_id` (`receiver_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `direct_messages_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `direct_messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `direct_messages_ibfk_3` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direct_messages`
--

LOCK TABLES `direct_messages` WRITE;
/*!40000 ALTER TABLE `direct_messages` DISABLE KEYS */;
INSERT INTO `direct_messages` VALUES (2,'hola andres','2018-07-03 23:04:57','2018-07-03 23:04:57',2,1,2),(3,'hey','2018-07-03 23:12:28','2018-07-03 23:12:28',2,1,2),(4,':\'','2018-07-03 23:13:21','2018-07-03 23:13:21',2,1,2),(5,':0','2018-07-03 23:13:22','2018-07-03 23:13:22',2,1,2),(6,'hi','2018-07-03 23:20:18','2018-07-03 23:20:18',2,1,2),(7,'hol','2018-07-03 23:22:58','2018-07-03 23:22:58',2,2,1),(8,'hola','2018-07-12 23:04:58','2018-07-12 23:04:58',2,2,1),(9,'??','2018-07-12 23:05:10','2018-07-12 23:05:10',2,2,1),(10,'???','2018-07-12 23:05:14','2018-07-12 23:05:14',2,2,1),(11,'???','2018-07-12 23:05:25','2018-07-12 23:05:25',2,2,1),(12,'hola andres','2018-07-12 23:07:01','2018-07-12 23:07:01',2,1,1),(13,'esta es otra wea','2018-07-12 23:07:52','2018-07-12 23:07:52',2,2,2),(14,'estoy hablando conmigo','2018-07-12 23:08:06','2018-07-12 23:08:06',2,1,1),(15,'aqui estoy hablando solo','2018-07-12 23:08:16','2018-07-12 23:08:16',2,2,2),(16,'que más andres=','2018-07-12 23:08:31','2018-07-12 23:08:31',2,1,2),(17,'?','2018-07-12 23:08:32','2018-07-12 23:08:32',2,1,2),(18,'pos bien parce','2018-07-12 23:08:46','2018-07-12 23:08:46',2,2,1),(19,'sisa','2018-07-12 23:08:54','2018-07-12 23:08:54',2,1,2),(20,'que más andres','2018-07-12 23:10:47','2018-07-12 23:10:47',1,1,3),(21,'pos bien','2018-07-12 23:11:06','2018-07-12 23:11:06',1,3,1),(22,'que pex','2018-07-12 23:11:49','2018-07-12 23:11:49',1,2,1),(23,'hola jose, como estas?','2018-07-12 23:12:16','2018-07-12 23:12:16',1,2,3),(24,'hola','2018-07-12 23:56:55','2018-07-12 23:56:55',3,1,2),(25,'hola','2018-07-13 00:10:28','2018-07-13 00:10:28',3,3,1),(26,'hi','2018-07-13 01:24:16','2018-07-13 01:24:16',3,2,1),(27,'hola','2018-07-13 01:24:55','2018-07-13 01:24:55',3,2,1),(28,'o','2018-07-13 01:28:57','2018-07-13 01:28:57',3,2,1),(29,'o','2018-07-13 01:29:43','2018-07-13 01:29:43',3,2,1),(30,'hola','2018-07-13 01:47:27','2018-07-13 01:47:27',3,2,1),(31,'k','2018-07-13 01:54:44','2018-07-13 01:54:44',3,2,1),(32,'k pex','2018-07-13 01:58:31','2018-07-13 01:58:31',1,3,1),(33,'k más bien','2018-07-13 01:58:38','2018-07-13 01:58:38',1,1,3),(34,'sisa','2018-07-13 01:58:40','2018-07-13 01:58:40',1,3,1),(35,'k mas','2018-07-13 01:59:37','2018-07-13 01:59:37',2,2,1),(36,'bien','2018-07-13 01:59:40','2018-07-13 01:59:40',2,1,2),(37,'d','2018-07-13 02:01:55','2018-07-13 02:01:55',2,2,1),(38,'a','2018-07-13 02:01:56','2018-07-13 02:01:56',2,2,1),(39,'k','2018-07-13 02:02:07','2018-07-13 02:02:07',2,2,1),(40,'sa','2018-07-13 02:02:10','2018-07-13 02:02:10',2,2,1),(41,'s','2018-07-13 02:02:19','2018-07-13 02:02:19',1,2,1),(42,'a','2018-07-13 02:02:22','2018-07-13 02:02:22',1,3,1),(43,'s','2018-07-13 02:02:26','2018-07-13 02:02:26',3,3,1),(44,'s','2018-07-13 02:02:39','2018-07-13 02:02:39',3,1,1),(45,'s','2018-07-13 02:05:33','2018-07-13 02:05:33',2,1,1),(46,'a','2018-07-13 02:05:41','2018-07-13 02:05:41',2,1,1),(47,'a','2018-07-13 02:05:45','2018-07-13 02:05:45',2,2,1),(48,'a','2018-07-13 02:08:15','2018-07-13 02:08:15',2,1,1);
/*!40000 ALTER TABLE `direct_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `admin` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`team_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `members_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `members_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'2018-07-03 16:33:13','2018-07-03 16:33:13',1,1),(0,'2018-07-03 23:03:55','2018-07-03 23:03:55',1,2),(1,'2018-07-12 21:18:56','2018-07-12 21:18:56',1,3),(0,'2018-07-12 23:11:33','2018-07-12 23:11:33',2,1),(1,'2018-07-03 23:03:41','2018-07-03 23:03:41',2,2),(0,'2018-07-12 23:55:55','2018-07-12 23:55:55',2,3),(0,'2018-07-12 23:10:18','2018-07-12 23:10:18',3,1),(0,'2018-07-13 00:09:58','2018-07-13 00:09:58',3,3);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `channel_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `channel_id` (`channel_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`channel_id`) REFERENCES `channels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'ok?','2018-07-03 16:35:44','2018-07-03 16:35:44',1,1),(2,'ok :)','2018-07-03 16:35:49','2018-07-03 16:35:49',1,1),(3,':0','2018-07-03 16:36:02','2018-07-03 16:36:02',2,1),(4,'hola','2018-07-03 19:28:13','2018-07-03 19:28:13',2,1),(5,'hi','2018-07-03 22:33:02','2018-07-03 22:33:02',1,1),(6,'a','2018-07-13 02:02:13','2018-07-13 02:02:13',3,1),(7,'w','2018-07-13 02:02:16','2018-07-13 02:02:16',1,1);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'team1','2018-07-03 16:33:12','2018-07-03 16:33:12'),(2,'xd','2018-07-03 23:03:41','2018-07-03 23:03:41'),(3,'','2018-07-12 21:18:55','2018-07-12 21:18:55');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'andres','andresmontoyafcb@gmail.com','$2b$12$CjIqYY0xXy1Dusgn3AIStO2lBhqpyGe/vTPaV1ElRrYEUvB/ufw5.','2018-07-03 16:32:56','2018-07-03 16:32:56'),(2,'jose','jose@gmail.com','$2b$12$tQlTqFHEwYU.0lMtASSWzubGCknlSoGLwMe2a1YZzqyAmbk4W/Nwa','2018-07-03 23:02:28','2018-07-03 23:02:28'),(3,'maria','maria@maria.com','$2b$12$Q0KqlHkBcFGxsB7rFP9vdOozwRss7pU5H22uVb5dbOQ/ZfZG/7Vdu','2018-07-12 23:09:46','2018-07-12 23:09:46');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-13 13:48:56
