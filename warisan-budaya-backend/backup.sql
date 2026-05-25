-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: db_warisan_budaya
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Lontar','lontar','Koleksi digital terkait Lontar warisan budaya Bali.','folder','2026-04-22 05:30:10','2026-04-22 05:30:10'),(2,'Seni Arsitektur','seni-arsitektur','Koleksi digital terkait Seni Arsitektur warisan budaya Bali.','folder','2026-04-22 05:30:10','2026-04-22 05:30:10'),(3,'Tarian Tradisional','tarian-tradisional','Koleksi digital terkait Tarian Tradisional warisan budaya Bali.','folder','2026-04-22 05:30:10','2026-04-22 05:30:10'),(4,'Upacara Adat','upacara-adat','Koleksi digital terkait Upacara Adat warisan budaya Bali.','folder','2026-04-22 05:30:10','2026-04-22 05:30:10');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_assets`
--

DROP TABLE IF EXISTS `digital_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `digital_assets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lecturer_id` bigint(20) unsigned NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `digital_assets_lecturer_id_foreign` (`lecturer_id`),
  KEY `digital_assets_category_id_foreign` (`category_id`),
  CONSTRAINT `digital_assets_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `digital_assets_lecturer_id_foreign` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_assets`
--

LOCK TABLES `digital_assets` WRITE;
/*!40000 ALTER TABLE `digital_assets` DISABLE KEYS */;
/*!40000 ALTER TABLE `digital_assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_lecturer`
--

DROP TABLE IF EXISTS `event_lecturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_lecturer` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` bigint(20) unsigned NOT NULL,
  `lecturer_id` bigint(20) unsigned NOT NULL,
  `role_in_event` varchar(255) NOT NULL DEFAULT 'Anggota',
  `event_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_lecturer_event_id_foreign` (`event_id`),
  KEY `event_lecturer_lecturer_id_foreign` (`lecturer_id`),
  CONSTRAINT `event_lecturer_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `event_lecturer_lecturer_id_foreign` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_lecturer`
--

LOCK TABLES `event_lecturer` WRITE;
/*!40000 ALTER TABLE `event_lecturer` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_lecturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` enum('Workshop','Seminar','Pameran','Riset') NOT NULL,
  `event_date` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `document_proof` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Workshop Digitalisasi Lontar Bali 2024','Workshop','2024-05-20','Lab Budaya Digital Undiksha',NULL,'Pelatihan teknis menggunakan scanner 3D untuk naskah kuno.','2026-04-22 05:30:10','2026-04-22 05:30:10');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturer_education`
--

DROP TABLE IF EXISTS `lecturer_education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lecturer_education` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lecturer_id` bigint(20) unsigned NOT NULL,
  `entry_year` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `university` varchar(255) NOT NULL,
  `study_program` varchar(255) NOT NULL,
  `graduation_year` varchar(255) NOT NULL,
  `predicate` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lecturer_education_lecturer_id_foreign` (`lecturer_id`),
  CONSTRAINT `lecturer_education_lecturer_id_foreign` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturer_education`
--

LOCK TABLES `lecturer_education` WRITE;
/*!40000 ALTER TABLE `lecturer_education` DISABLE KEYS */;
INSERT INTO `lecturer_education` VALUES (1,1,'1 Januari 2024','Profesi','Indonesia','Universitas Udayana','Teknik Informatika','2024','cum laude','2026-04-22 05:30:10','2026-04-22 05:30:10'),(2,1,'2 Januari 2024','Profesi','Indonesia','Universitas Udayana','Teknik Informatika','2024','cum laude','2026-04-22 05:30:10','2026-04-22 05:30:10');
/*!40000 ALTER TABLE `lecturer_education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturer_positions`
--

DROP TABLE IF EXISTS `lecturer_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lecturer_positions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lecturer_id` bigint(20) unsigned NOT NULL,
  `type` enum('Fungsional','Struktural') NOT NULL,
  `position_name` varchar(255) NOT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `sk_number` varchar(255) NOT NULL,
  `sk_date` date NOT NULL,
  `tmt` date NOT NULL,
  `valid_until` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lecturer_positions_lecturer_id_foreign` (`lecturer_id`),
  CONSTRAINT `lecturer_positions_lecturer_id_foreign` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturer_positions`
--

LOCK TABLES `lecturer_positions` WRITE;
/*!40000 ALTER TABLE `lecturer_positions` DISABLE KEYS */;
INSERT INTO `lecturer_positions` VALUES (1,1,'Fungsional','Lektor Kepala',NULL,'SK-FUN-001','2022-05-10','2022-06-01',NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(2,1,'Struktural','Ketua Gugus Kendali Mutu','Jurusan Teknik Informatika','SK-STR-099','2023-01-15','2023-02-01','2027-02-01','2026-04-22 05:30:10','2026-04-22 05:30:10');
/*!40000 ALTER TABLE `lecturer_positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturer_ranks`
--

DROP TABLE IF EXISTS `lecturer_ranks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lecturer_ranks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lecturer_id` bigint(20) unsigned NOT NULL,
  `group_code` varchar(255) NOT NULL,
  `rank_name` varchar(255) NOT NULL,
  `sk_number` varchar(255) NOT NULL,
  `sk_date` date NOT NULL,
  `tmt` date NOT NULL,
  `received_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lecturer_ranks_lecturer_id_foreign` (`lecturer_id`),
  CONSTRAINT `lecturer_ranks_lecturer_id_foreign` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturer_ranks`
--

LOCK TABLES `lecturer_ranks` WRITE;
/*!40000 ALTER TABLE `lecturer_ranks` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecturer_ranks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturer_studies`
--

DROP TABLE IF EXISTS `lecturer_studies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lecturer_studies` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lecturer_id` bigint(20) unsigned NOT NULL,
  `entry_year` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `university` varchar(255) NOT NULL,
  `study_program` varchar(255) NOT NULL,
  `scholarship` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `Types_of_Learning` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lecturer_studies_lecturer_id_foreign` (`lecturer_id`),
  CONSTRAINT `lecturer_studies_lecturer_id_foreign` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturer_studies`
--

LOCK TABLES `lecturer_studies` WRITE;
/*!40000 ALTER TABLE `lecturer_studies` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecturer_studies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturer_teachings`
--

DROP TABLE IF EXISTS `lecturer_teachings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lecturer_teachings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lecturer_id` bigint(20) unsigned NOT NULL,
  `academic_year` varchar(255) NOT NULL,
  `course_code` varchar(255) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `credits` decimal(3,2) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lecturer_teachings_lecturer_id_foreign` (`lecturer_id`),
  CONSTRAINT `lecturer_teachings_lecturer_id_foreign` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturer_teachings`
--

LOCK TABLES `lecturer_teachings` WRITE;
/*!40000 ALTER TABLE `lecturer_teachings` DISABLE KEYS */;
INSERT INTO `lecturer_teachings` VALUES (1,1,'2023 GANJIL','IK123','Pemrograman Web Next.js',3.00,'Kelas A','2026-04-22 05:30:10','2026-04-22 05:30:10'),(2,1,'2023 GANJIL','IK456','Basis Data Lanjut',3.00,'Kelas B','2026-04-22 05:30:10','2026-04-22 05:30:10');
/*!40000 ALTER TABLE `lecturer_teachings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturer_work_contracts`
--

DROP TABLE IF EXISTS `lecturer_work_contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lecturer_work_contracts` (
  `lecturer_id` bigint(20) unsigned NOT NULL,
  `work_status` varchar(255) NOT NULL,
  `current_status` varchar(255) NOT NULL,
  `tmt` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `lecturer_work_contracts_lecturer_id_foreign` (`lecturer_id`),
  CONSTRAINT `lecturer_work_contracts_lecturer_id_foreign` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturer_work_contracts`
--

LOCK TABLES `lecturer_work_contracts` WRITE;
/*!40000 ALTER TABLE `lecturer_work_contracts` DISABLE KEYS */;
INSERT INTO `lecturer_work_contracts` VALUES (1,'PNS','Aktif','18 Agustus 2023','2026-04-22 05:30:10','2026-04-22 05:30:10');
/*!40000 ALTER TABLE `lecturer_work_contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturers`
--

DROP TABLE IF EXISTS `lecturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lecturers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nip` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `title_prefix` varchar(255) DEFAULT NULL,
  `title_suffix` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `education` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`education`)),
  `status` enum('Aktif','Tugas Belajar','Cuti') NOT NULL DEFAULT 'Aktif',
  `photo_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lecturers_nip_unique` (`nip`),
  UNIQUE KEY `lecturers_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturers`
--

LOCK TABLES `lecturers` WRITE;
/*!40000 ALTER TABLE `lecturers` DISABLE KEYS */;
INSERT INTO `lecturers` VALUES (1,'198403172010121001','Anak Agung Candra Gunawan, S.Kom., M.Kom.','dosen.lab@undiksha.ac.id','Dr.','S.Kom., M.Kom.','Dosen tetap di Jurusan Teknik Informatika yang berfokus pada preservasi budaya digital dan sistem informasi warisan budaya Bali.','[{\"year\":\"2015\",\"degree\":\"S3 - Ilmu Komputer\",\"univ\":\"Universitas Indonesia\"},{\"year\":\"2008\",\"degree\":\"S2 - Teknologi Informasi\",\"univ\":\"ITB\"}]','Aktif',NULL,'2026-04-22 05:30:09','2026-04-22 05:30:09');
/*!40000 ALTER TABLE `lecturers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_04_17_112603_create_lectures_table',1),(5,'2026_04_17_112624_create_categories_table',1),(6,'2026_04_17_112644_create_events_table',1),(7,'2026_04_17_112706_create_digital_assets_table',1),(8,'2026_04_17_112713_create_publications_table',1),(9,'2026_04_17_112751_create_event_lecturer_table',1),(10,'2026_04_18_120645_create_personal_access_tokens_table',1),(11,'2026_04_19_133332_create_lecturer_education_table',1),(12,'2026_04_19_133359_create_lecturer_ranks_table',1),(13,'2026_04_19_133417_create_lecturer_studies_table',1),(14,'2026_04_19_133434_create_lecturer_positions_table',1),(15,'2026_04_19_133506_create_lecturer_teachings_table',1),(16,'2026_04_20_124403_create_lecturer_work_contracts_table',1),(17,'2026_04_24_125315_create_lecture_stats_view',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publications`
--

DROP TABLE IF EXISTS `publications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lecturer_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` enum('PENELITIAN','PENGABDIAN') NOT NULL,
  `type` varchar(255) NOT NULL,
  `year` year(4) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `publications_lecturer_id_foreign` (`lecturer_id`),
  CONSTRAINT `publications_lecturer_id_foreign` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publications`
--

LOCK TABLES `publications` WRITE;
/*!40000 ALTER TABLE `publications` DISABLE KEYS */;
INSERT INTO `publications` VALUES (1,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-1','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(2,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-2','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(3,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-3','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(4,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-4','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(5,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-5','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(6,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-6','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(7,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-7','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(8,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-8','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(9,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-9','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(10,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-10','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(11,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-11','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(12,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-12','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(13,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-13','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(14,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-14','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(15,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-15','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(16,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-16','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(17,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-17','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(18,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-18','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(19,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-19','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(20,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-20','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(21,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-21','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(22,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-22','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(23,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-23','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(24,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-24','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(25,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-25','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(26,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-26','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(27,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-27','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(28,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-28','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(29,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-29','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(30,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-30','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(31,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-31','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(32,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-32','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(33,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-33','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(34,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-34','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(35,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-35','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(36,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-36','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(37,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-37','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(38,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-38','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(39,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-39','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(40,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-40','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(41,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-41','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(42,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-42','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(43,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-43','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(44,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-44','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(45,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-45','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(46,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-46','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(47,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-47','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(48,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-48','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(49,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-49','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(50,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-50','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(51,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-51','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(52,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-52','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(53,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-53','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(54,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-54','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(55,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-55','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(56,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-56','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(57,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-57','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(58,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-58','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(59,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-59','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(60,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-60','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(61,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-61','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(62,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-62','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(63,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-63','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(64,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-64','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(65,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-65','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(66,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-66','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(67,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-67','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(68,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-68','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(69,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-69','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(70,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-70','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(71,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-71','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(72,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-72','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(73,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-73','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(74,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-74','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(75,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-75','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(76,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-76','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(77,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-77','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(78,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-78','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(79,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-79','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(80,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-80','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(81,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-81','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(82,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-82','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(83,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-83','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(84,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-84','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(85,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-85','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(86,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-86','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(87,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-87','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(88,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-88','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(89,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-89','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(90,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-90','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(91,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-91','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(92,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-92','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(93,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-93','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(94,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-94','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(95,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-95','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(96,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-96','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(97,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-97','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(98,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-98','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(99,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-99','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(100,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-100','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(101,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-101','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(102,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-102','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(103,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-103','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(104,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-104','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(105,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-105','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(106,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-106','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(107,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-107','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(108,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-108','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(109,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-109','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(110,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-110','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(111,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-111','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(112,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-112','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(113,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-113','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(114,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-114','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(115,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-115','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(116,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-116','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(117,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-117','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(118,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-118','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(119,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-119','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(120,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-120','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(121,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-121','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(122,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-122','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(123,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-123','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(124,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-124','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(125,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-125','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(126,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-126','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(127,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-127','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(128,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-128','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(129,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-129','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(130,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-130','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(131,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-131','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(132,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-132','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(133,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-133','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(134,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-134','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(135,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-135','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(136,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-136','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(137,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-137','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(138,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-138','PENELITIAN','Jurnal Ilmiah',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(139,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-139','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(140,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-140','PENELITIAN','Jurnal Ilmiah',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(141,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-141','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(142,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-142','PENELITIAN','Jurnal Ilmiah',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(143,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-143','PENELITIAN','Jurnal Ilmiah',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(144,1,'Penelitian Warisan Budaya Jurnal Ilmiah Ke-144','PENELITIAN','Jurnal Ilmiah',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(145,1,'Penelitian Warisan Budaya Buku Referensi Ke-1','PENELITIAN','Buku Referensi',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(146,1,'Penelitian Warisan Budaya Buku Referensi Ke-2','PENELITIAN','Buku Referensi',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(147,1,'Penelitian Warisan Budaya Buku Referensi Ke-3','PENELITIAN','Buku Referensi',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(148,1,'Penelitian Warisan Budaya Buku Referensi Ke-4','PENELITIAN','Buku Referensi',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(149,1,'Penelitian Warisan Budaya Buku Referensi Ke-5','PENELITIAN','Buku Referensi',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(150,1,'Penelitian Warisan Budaya Buku Referensi Ke-6','PENELITIAN','Buku Referensi',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(151,1,'Penelitian Warisan Budaya Buku Referensi Ke-7','PENELITIAN','Buku Referensi',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(152,1,'Penelitian Warisan Budaya Buku Referensi Ke-8','PENELITIAN','Buku Referensi',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(153,1,'Penelitian Warisan Budaya Buku Referensi Ke-9','PENELITIAN','Buku Referensi',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(154,1,'Penelitian Warisan Budaya HKI Ke-1','PENELITIAN','HKI',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(155,1,'Penelitian Warisan Budaya HKI Ke-2','PENELITIAN','HKI',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(156,1,'Penelitian Warisan Budaya HKI Ke-3','PENELITIAN','HKI',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(157,1,'Penelitian Warisan Budaya HKI Ke-4','PENELITIAN','HKI',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(158,1,'Penelitian Warisan Budaya HKI Ke-5','PENELITIAN','HKI',2024,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(159,1,'Penelitian Warisan Budaya HKI Ke-6','PENELITIAN','HKI',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(160,1,'Penelitian Warisan Budaya HKI Ke-7','PENELITIAN','HKI',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(161,1,'Penelitian Warisan Budaya HKI Ke-8','PENELITIAN','HKI',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(162,1,'Penelitian Warisan Budaya HKI Ke-9','PENELITIAN','HKI',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(163,1,'Penelitian Warisan Budaya HKI Ke-10','PENELITIAN','HKI',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(164,1,'Penelitian Warisan Budaya Prosiding Ke-1','PENELITIAN','Prosiding',2022,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(165,1,'Penelitian Warisan Budaya Prosiding Ke-2','PENELITIAN','Prosiding',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(166,1,'Penelitian Warisan Budaya Prosiding Ke-3','PENELITIAN','Prosiding',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(167,1,'Penelitian Warisan Budaya Prosiding Ke-4','PENELITIAN','Prosiding',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(168,1,'Penelitian Warisan Budaya Prosiding Ke-5','PENELITIAN','Prosiding',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(169,1,'Penelitian Warisan Budaya Prosiding Ke-6','PENELITIAN','Prosiding',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(170,1,'Penelitian Warisan Budaya Prosiding Ke-7','PENELITIAN','Prosiding',2020,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(171,1,'Penelitian Warisan Budaya Prosiding Ke-8','PENELITIAN','Prosiding',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(172,1,'Penelitian Warisan Budaya Prosiding Ke-9','PENELITIAN','Prosiding',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(173,1,'Penelitian Warisan Budaya Prosiding Ke-10','PENELITIAN','Prosiding',2023,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(174,1,'Penelitian Warisan Budaya Prosiding Ke-11','PENELITIAN','Prosiding',2021,'https://scholar.google.com','2026-04-22 05:30:10','2026-04-22 05:30:10'),(175,1,'Pengabdian Masyarakat Pelatihan Ke-1','PENGABDIAN','Pelatihan',2021,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(176,1,'Pengabdian Masyarakat Pelatihan Ke-2','PENGABDIAN','Pelatihan',2023,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(177,1,'Pengabdian Masyarakat Pelatihan Ke-3','PENGABDIAN','Pelatihan',2021,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(178,1,'Pengabdian Masyarakat Pelatihan Ke-4','PENGABDIAN','Pelatihan',2024,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(179,1,'Pengabdian Masyarakat Pendampingan Masyarakat Ke-1','PENGABDIAN','Pendampingan Masyarakat',2024,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(180,1,'Pengabdian Masyarakat Pendampingan Masyarakat Ke-2','PENGABDIAN','Pendampingan Masyarakat',2023,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(181,1,'Pengabdian Masyarakat Pendampingan Masyarakat Ke-3','PENGABDIAN','Pendampingan Masyarakat',2023,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(182,1,'Pengabdian Masyarakat Pendampingan Masyarakat Ke-4','PENGABDIAN','Pendampingan Masyarakat',2023,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(183,1,'Pengabdian Masyarakat Pendampingan Masyarakat Ke-5','PENGABDIAN','Pendampingan Masyarakat',2021,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(184,1,'Pengabdian Masyarakat Pendampingan Masyarakat Ke-6','PENGABDIAN','Pendampingan Masyarakat',2023,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(185,1,'Pengabdian Masyarakat Penyuluhan Ke-1','PENGABDIAN','Penyuluhan',2022,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(186,1,'Pengabdian Masyarakat Penyuluhan Ke-2','PENGABDIAN','Penyuluhan',2023,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(187,1,'Pengabdian Masyarakat Penyuluhan Ke-3','PENGABDIAN','Penyuluhan',2021,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(188,1,'Pengabdian Masyarakat Penyuluhan Ke-4','PENGABDIAN','Penyuluhan',2023,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(189,1,'Pengabdian Masyarakat Penyuluhan Ke-5','PENGABDIAN','Penyuluhan',2024,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(190,1,'Pengabdian Masyarakat Penyuluhan Ke-6','PENGABDIAN','Penyuluhan',2024,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10'),(191,1,'Pengabdian Masyarakat Penyuluhan Ke-7','PENGABDIAN','Penyuluhan',2022,NULL,'2026-04-22 05:30:10','2026-04-22 05:30:10');
/*!40000 ALTER TABLE `publications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test User','test@example.com','2026-04-22 05:30:14','$2y$12$mdIb1flKJUNQfDQRf1H8X.V32T9P8Sou4vLnRW1.wNSLhd4WEPGCq','yNikvJRpdP','2026-04-22 05:30:14','2026-04-22 05:30:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_lecturer_stats`
--

DROP TABLE IF EXISTS `v_lecturer_stats`;
/*!50001 DROP VIEW IF EXISTS `v_lecturer_stats`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_lecturer_stats` AS SELECT
 1 AS `lecturer_id`,
  1 AS `jurnal_count`,
  1 AS `buku_count`,
  1 AS `hki_count`,
  1 AS `pengabdian_count` */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_lecturer_stats`
--

/*!50001 DROP VIEW IF EXISTS `v_lecturer_stats`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_lecturer_stats` AS select `l`.`id` AS `lecturer_id`,(select count(0) from `publications` where `publications`.`lecturer_id` = `l`.`id` and `publications`.`type` = 'Jurnal Ilmiah') AS `jurnal_count`,(select count(0) from `publications` where `publications`.`lecturer_id` = `l`.`id` and `publications`.`type` = 'Buku Referensi') AS `buku_count`,(select count(0) from `publications` where `publications`.`lecturer_id` = `l`.`id` and `publications`.`type` = 'HKI') AS `hki_count`,(select count(0) from `publications` where `publications`.`lecturer_id` = `l`.`id` and `publications`.`category` = 'PENGABDIAN') AS `pengabdian_count` from `lecturers` `l` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-25  1:01:30
