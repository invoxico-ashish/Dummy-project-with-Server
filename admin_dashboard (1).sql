-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2023 at 03:22 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_us`
--

CREATE TABLE `about_us` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `desciption` varchar(500) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `about_us`
--

INSERT INTO `about_us` (`id`, `heading`, `desciption`, `image`) VALUES
(1, 'About us', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using LoremIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem', '');

-- --------------------------------------------------------

--
-- Table structure for table `admin_blog`
--

CREATE TABLE `admin_blog` (
  `blog_id` int(255) NOT NULL,
  `blog_Title` varchar(255) NOT NULL,
  `blog_Status` varchar(255) NOT NULL,
  `blog_Selected_Category` int(255) NOT NULL DEFAULT 0,
  `blog_Short_Desc` varchar(100) NOT NULL,
  `blog_Long_Desc` varchar(500) NOT NULL,
  `blog_img` varchar(255) NOT NULL,
  `blog_delete` varchar(255) NOT NULL DEFAULT '1',
  `blog_Publish_Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_blog`
--

INSERT INTO `admin_blog` (`blog_id`, `blog_Title`, `blog_Status`, `blog_Selected_Category`, `blog_Short_Desc`, `blog_Long_Desc`, `blog_img`, `blog_delete`, `blog_Publish_Date`) VALUES
(1, 'test_one', '1', 4, 'one_test_one', 'test_one', 'Blog_img_1695042234036360_F_558595892_61Sz5WMEIUno6YP5D5ZXl9b1pnyBNZwi.jpg', '1', '2023-09-18'),
(2, 'Test_blog_two', '0', 2, 'Test_short_two', 'Test_long_two', 'Blog_img_1695023877844360_F_558595892_61Sz5WMEIUno6YP5D5ZXl9b1pnyBNZwi.jpg', '1', '2023-09-18'),
(3, 'test_three', '1', 2, 'test', 'test', 'Blog_img_1695024511591revv-10.jpg', '1', '2023-09-18'),
(4, 'Test_blog_three', '1', 3, 'Short', 'Long', 'Blog_img_1695032271322e03edbe588d3866d539e5bbb35d9080c.jpg', '1', '2023-09-18'),
(5, 'Test_blog_four', '0', 1, 'short', 'long', 'Blog_img_1695026195188e03edbe588d3866d539e5bbb35d9080c.jpg', '1', '2023-09-18'),
(6, 'TEST_blog', '1', 1, 'test', 'test', 'Blog_img_1695033393766e03edbe588d3866d539e5bbb35d9080c.jpg', '1', '2023-09-18'),
(9, 'test', '1', 3, 'test', 'test', 'Blog_img_1695034044248f595dab9363cadf730655aa6101db17b.png', '0', '2023-09-18');

-- --------------------------------------------------------

--
-- Table structure for table `admin_blog_categories`
--

CREATE TABLE `admin_blog_categories` (
  `Cat_id` int(11) NOT NULL,
  `Cat_Title` varchar(255) NOT NULL,
  `Cat_Parent` varchar(255) NOT NULL,
  `Cat_Status` varchar(255) NOT NULL DEFAULT '1',
  `Cat_Delete` varchar(255) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_blog_categories`
--

INSERT INTO `admin_blog_categories` (`Cat_id`, `Cat_Title`, `Cat_Parent`, `Cat_Status`, `Cat_Delete`) VALUES
(1, 'test_cat_one', '2', '1', '1'),
(2, 'test_cat_two', '1', '1', '1'),
(3, 'test_cat_three', '1', '1', '1'),
(4, 'test_cat_four-test', '3', '0', '1');

-- --------------------------------------------------------

--
-- Table structure for table `admin_details`
--

CREATE TABLE `admin_details` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact_no` varchar(20) NOT NULL,
  `Profile_pic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_details`
--

INSERT INTO `admin_details` (`admin_id`, `name`, `email`, `password`, `contact_no`, `Profile_pic`) VALUES
(20, 'superAdmin', 'supertest@gmail.com', '$2a$10$d4WB2.oYlVc3UJb92iawB./yqmoGChw.YoVYTLvAKRuLWXTskon2i', '7876472347', 'ProfileImage_16938022751101691139112633_about-img.jpg'),
(26, 'Test', 'test@yahoo.com', '$2a$10$MGAo4BdGPIIpKrb3mfQuHe6wD.iHIdv.YC3xMQ11dELvKltdkr48.', '36925814710', 'ProfileImage_1693208608395360_F_558595892_61Sz5WMEIUno6YP5D5ZXl9b1pnyBNZwi.jpg'),
(32, 'Mr lama', 'testone@gmailcom', '$2a$10$DlzHhTcgw5yx/8MM.cYnieINf7dva.EJ9JtJ.GJfb0otH38F1l3Ym', '78944561230', 'ProfileImage_16938164705681691151307249_psychedelic-github-mens-longsleeve-shirt.jpg'),
(34, 'john', 'john@yahoo.com', '$2a$10$lhrJyAh8xY0/ApS6A75PlucFj4epqZOZ0k7W/kDeFph4rAl0vVQ9q', '7894561230', 'ProfileImage_1693208537519360_F_558595892_61Sz5WMEIUno6YP5D5ZXl9b1pnyBNZwi.jpg'),
(46, 'robuik', 'Robuik@yahoo.com', '$2a$10$2XXyQHgtOYVtYLPZKP0jKewIs0D0PxQRURdTSVl3SL.4aPbvytbvS', '0020030010', 'ProfileImage_1693219513548p3.jpg'),
(47, 'rubika', 'rubika@gmail.com', '$2a$10$hnkD4EBXQqgHXViV2pxUq.3Lln.YzLq8ZdmNDPUY1EvHLAG.ZvRwy', '7896541230', 'ProfileImage_1693227984965team1.jpg'),
(48, 'lorem', 'lorem@gmail.com', '$2a$10$w9CCaVL9sIc7XBuDSCik/.o92gC4/ZkjM5s0KDcjoGgfaBkeawlFW', '7412589630', 'ProfileImage_1694065468405f595dab9363cadf730655aa6101db17b.png'),
(51, 'jasica', 'jasica@yahoo.com', '$2a$10$PYeanaEi9YCdBI5jEcgiVeHCXeofAasyKe0xEp3Ou3WoFtsoBVZv6', '7896541230', 'ProfileImage_1694075185470p1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `footer_navigation_link`
--

CREATE TABLE `footer_navigation_link` (
  `footer_nav_id` int(255) NOT NULL,
  `foo_link_title` varchar(255) NOT NULL,
  `foo_link_target` varchar(255) NOT NULL,
  `foo_link_display_order` varchar(255) NOT NULL,
  `foo_link_delete_value` varchar(255) NOT NULL DEFAULT '1',
  `foo_link_LINKS` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `footer_navigation_link`
--

INSERT INTO `footer_navigation_link` (`footer_nav_id`, `foo_link_title`, `foo_link_target`, `foo_link_display_order`, `foo_link_delete_value`, `foo_link_LINKS`) VALUES
(1, 'Home', '_self', '1', '1', '/'),
(2, 'About', '[object Object]', '2', '1', '/about'),
(3, 'portfolio', '_blank', '3', '1', '/portfolio'),
(4, 'team', '_self', '4', '1', '/team');

-- --------------------------------------------------------

--
-- Table structure for table `general_settings`
--

CREATE TABLE `general_settings` (
  `Setting_id` int(11) NOT NULL,
  `Setting_key` varchar(255) NOT NULL,
  `Setting_value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `general_settings`
--

INSERT INTO `general_settings` (`Setting_id`, `Setting_key`, `Setting_value`) VALUES
(1, 'email', 'PhotoSec@gmail.com'),
(2, 'address', 'sec 74'),
(3, 'websiteName', 'photoSec'),
(4, 'mobile', '2252165236'),
(5, 'fb', 'https://www.facebook.com/login/'),
(6, 'insta', 'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fonetap%2F%3Fnext%3D%252F%26__coig_login%3D1'),
(7, 'linkedin', 'https://in.linkedin.com/?src=go-pa&trk=sem-ga_campid.14650114791_asid.148989926103_crid.662526547908_kw.www%20linkedin%20com_d.c_tid.kwd-2246448002_n.g_mt.p_geo.9303130&mcid=6844056167778418688&cid=&gclid=CjwKCAjwo9unBhBTEiwAipC1122AUjYgJQF-D07hlCa05MqsvX'),
(8, 'twitter', 'https://twitter.com/i/flow/login'),
(9, 'webLogo', 'webLogo_1694755400545logo.png'),
(10, 'favLogo', 'favLogo_1694755440354f595dab9363cadf730655aa6101db17b.png');

-- --------------------------------------------------------

--
-- Table structure for table `module_data`
--

CREATE TABLE `module_data` (
  `id` int(11) NOT NULL,
  `module_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `module_data`
--

INSERT INTO `module_data` (`id`, `module_name`) VALUES
(1, 'Portfolio'),
(2, 'Slider'),
(3, 'Team'),
(4, 'navigation'),
(5, 'Blog');

-- --------------------------------------------------------

--
-- Table structure for table `navigation_link`
--

CREATE TABLE `navigation_link` (
  `Nav_link_id` int(255) NOT NULL,
  `navigate_id` int(255) NOT NULL,
  `nav_link_title` varchar(255) NOT NULL,
  `nav_link_target` varchar(255) NOT NULL,
  `nav_link_display_order` varchar(11) NOT NULL,
  `nav_link_delete_value` varchar(255) NOT NULL DEFAULT '1',
  `nav_link_LINKS` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `navigation_link`
--

INSERT INTO `navigation_link` (`Nav_link_id`, `navigate_id`, `nav_link_title`, `nav_link_target`, `nav_link_display_order`, `nav_link_delete_value`, `nav_link_LINKS`) VALUES
(1, 1, 'Home', '_self', '1', '1', '/'),
(2, 2, 'about', '_blank', '2', '1', '/about'),
(3, 3, 'Portfolio', '_self', '3', '1', '/portfolio'),
(4, 4, 'Team', '_blank', '4', '1', '/team');

-- --------------------------------------------------------

--
-- Table structure for table `navigation_module`
--

CREATE TABLE `navigation_module` (
  `navigate_id` int(11) NOT NULL,
  `Modules` varchar(255) NOT NULL,
  `mod_status` varchar(255) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `navigation_module`
--

INSERT INTO `navigation_module` (`navigate_id`, `Modules`, `mod_status`) VALUES
(1, 'header', '1'),
(2, 'Footer4', '1'),
(3, 'Test', '1'),
(4, 'Testo', '1'),
(5, 'test_module', '1');

-- --------------------------------------------------------

--
-- Table structure for table `nav_link_modules`
--

CREATE TABLE `nav_link_modules` (
  `nav_link_module_id` int(255) NOT NULL,
  `nav_link_module_title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nav_link_modules`
--

INSERT INTO `nav_link_modules` (`nav_link_module_id`, `nav_link_module_title`) VALUES
(1, 'Home'),
(2, 'About'),
(3, 'Portfolio'),
(4, 'Team');

-- --------------------------------------------------------

--
-- Table structure for table `our_team_data`
--

CREATE TABLE `our_team_data` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `our_team_data`
--

INSERT INTO `our_team_data` (`id`, `title`, `description`) VALUES
(1, 'Our Creative Team', '  The point of using LoremIt is a long established fact that a reader will be distracted the readable content of a page when looking at its layout. The point of using Lorem');

-- --------------------------------------------------------

--
-- Table structure for table `our_team_img`
--

CREATE TABLE `our_team_img` (
  `team_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `F_B` varchar(500) NOT NULL,
  `I_G` varchar(500) NOT NULL,
  `Twi_tter` varchar(500) NOT NULL,
  `Linked_in` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `our_team_img`
--

INSERT INTO `our_team_img` (`team_id`, `name`, `image`, `F_B`, `I_G`, `Twi_tter`, `Linked_in`) VALUES
(8, 'John Wayne', 'slideImage_1691568775400team2.jpg', 'https://www.facebook.com/login/', 'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fonetap%2F%3Fnext%3D%252F%26__coig_login%3D1', 'https://twitter.com/i/flow/login', 'https://in.linkedin.com/?src=go-pa&trk=sem-ga_campid.14650114791_asid.148989926103_crid.662526547908_kw.www+linkedin+com_d.c_tid.kwd-2246448002_n.g_mt.p_geo.9303130&mcid=6844056167778418688&cid=&gclid=CjwKCAjwo9unBhBTEiwAipC1122AUjYgJQF-D07hlCa05MqsvX&original_referer=http%3A%2F%2Flocalhost%3A3000%2F'),
(12, 'Chritina Stark', 'slideImage_1691568786911team3.jpg', 'https://www.facebook.com/login/', 'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fonetap%2F%3Fnext%3D%252F%26__coig_login%3D1', 'https://twitter.com/i/flow/login', 'https://in.linkedin.com/?src=go-pa&trk=sem-ga_campid.14650114791_asid.148989926103_crid.662526547908_kw.www+linkedin+com_d.c_tid.kwd-2246448002_n.g_mt.p_geo.9303130&mcid=6844056167778418688&cid=&gclid=CjwKCAjwo9unBhBTEiwAipC1122AUjYgJQF-D07hlCa05MqsvX&original_referer=http%3A%2F%2Flocalhost%3A3000%2F'),
(13, 'dasdasd', 'slideImage_1691671916614team1.jpg', 'https://www.facebook.com/login/', 'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fonetap%2F%3Fnext%3D%252F%26__coig_login%3D1', 'https://twitter.com/i/flow/login', 'https://in.linkedin.com/?src=go-pa&trk=sem-ga_campid.14650114791_asid.148989926103_crid.662526547908_kw.www+linkedin+com_d.c_tid.kwd-2246448002_n.g_mt.p_geo.9303130&mcid=6844056167778418688&cid=&gclid=CjwKCAjwo9unBhBTEiwAipC1122AUjYgJQF-D07hlCa05MqsvX&original_referer=http%3A%2F%2Flocalhost%3A3000%2F');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(11) NOT NULL,
  `module_id` int(255) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `permission_value` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_id`, `module_id`, `admin_id`, `permission_value`) VALUES
(1, 1, 26, 2),
(3, 2, 26, 2),
(4, 3, 26, 2),
(7, 2, 32, 2),
(8, 1, 34, 2),
(23, 3, 34, 2),
(24, 2, 34, 0),
(28, 3, 32, 1),
(29, 1, 32, 2),
(34, 3, 47, 1),
(35, 2, 46, 1),
(36, 3, 46, 0),
(37, 2, 47, 2),
(38, 1, 47, 2),
(39, 1, 51, 0),
(40, 2, 51, 2),
(41, 4, 26, 1),
(42, 4, 32, 1),
(43, 5, 32, 2),
(44, 5, 26, 1);

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_img`
--

CREATE TABLE `portfolio_img` (
  `portF_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `portfolio_img`
--

INSERT INTO `portfolio_img` (`portF_id`, `name`, `image`) VALUES
(9, 'dasdas', 'slideImage_1694073797783p1.jpg'),
(10, 'uh', 'slideImage_1694073065680p2.jpg'),
(11, 'oin', 'slideImage_1694072978338p3.jpg'),
(22, 'aASD', 'slideImage_1691559023049p5.jpg'),
(23, 'dfgfgdfgdfg', 'slideImage_1694073085413p4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `slider_data`
--

CREATE TABLE `slider_data` (
  `slider_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `img_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slider_data`
--

INSERT INTO `slider_data` (`slider_id`, `title`, `image`, `img_name`) VALUES
(64, 'adasdasda', 'slideImage_1693826514120slideImage_1691671568610slider-img2.jpg', 'dasdasdd'),
(65, 'asdasd', 'slideImage_1693826542144slider-img3.jpg', 'asdasdasd'),
(66, 'sdas', 'slideImage_1694073119452slider-img.jpg', 'dasdasd');

-- --------------------------------------------------------

--
-- Table structure for table `slider_images`
--

CREATE TABLE `slider_images` (
  `slider_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slider_images`
--

INSERT INTO `slider_images` (`slider_id`, `name`, `image`) VALUES
(4, 'sone', 'image_1690789747138.jpg'),
(5, 'stwo', 'image_1690789766245.jpg'),
(6, 'sthree', 'image_1690789787702.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_us`
--
ALTER TABLE `about_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_blog`
--
ALTER TABLE `admin_blog`
  ADD PRIMARY KEY (`blog_id`);

--
-- Indexes for table `admin_blog_categories`
--
ALTER TABLE `admin_blog_categories`
  ADD PRIMARY KEY (`Cat_id`);

--
-- Indexes for table `admin_details`
--
ALTER TABLE `admin_details`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `footer_navigation_link`
--
ALTER TABLE `footer_navigation_link`
  ADD PRIMARY KEY (`footer_nav_id`),
  ADD UNIQUE KEY `foo_link_display_order` (`foo_link_display_order`);

--
-- Indexes for table `general_settings`
--
ALTER TABLE `general_settings`
  ADD PRIMARY KEY (`Setting_id`),
  ADD UNIQUE KEY `Setting_key` (`Setting_key`);

--
-- Indexes for table `module_data`
--
ALTER TABLE `module_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `navigation_link`
--
ALTER TABLE `navigation_link`
  ADD PRIMARY KEY (`Nav_link_id`),
  ADD UNIQUE KEY `nav_link_display_order` (`nav_link_display_order`),
  ADD KEY `FK_Nav_links` (`navigate_id`);

--
-- Indexes for table `navigation_module`
--
ALTER TABLE `navigation_module`
  ADD PRIMARY KEY (`navigate_id`);

--
-- Indexes for table `nav_link_modules`
--
ALTER TABLE `nav_link_modules`
  ADD PRIMARY KEY (`nav_link_module_id`);

--
-- Indexes for table `our_team_data`
--
ALTER TABLE `our_team_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `our_team_img`
--
ALTER TABLE `our_team_img`
  ADD PRIMARY KEY (`team_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `permission_id` (`module_id`,`admin_id`) USING BTREE,
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `portfolio_img`
--
ALTER TABLE `portfolio_img`
  ADD PRIMARY KEY (`portF_id`);

--
-- Indexes for table `slider_data`
--
ALTER TABLE `slider_data`
  ADD PRIMARY KEY (`slider_id`);

--
-- Indexes for table `slider_images`
--
ALTER TABLE `slider_images`
  ADD PRIMARY KEY (`slider_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_us`
--
ALTER TABLE `about_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admin_blog`
--
ALTER TABLE `admin_blog`
  MODIFY `blog_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `admin_blog_categories`
--
ALTER TABLE `admin_blog_categories`
  MODIFY `Cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `admin_details`
--
ALTER TABLE `admin_details`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `footer_navigation_link`
--
ALTER TABLE `footer_navigation_link`
  MODIFY `footer_nav_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `general_settings`
--
ALTER TABLE `general_settings`
  MODIFY `Setting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=782;

--
-- AUTO_INCREMENT for table `module_data`
--
ALTER TABLE `module_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `navigation_link`
--
ALTER TABLE `navigation_link`
  MODIFY `Nav_link_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `navigation_module`
--
ALTER TABLE `navigation_module`
  MODIFY `navigate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `nav_link_modules`
--
ALTER TABLE `nav_link_modules`
  MODIFY `nav_link_module_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `our_team_data`
--
ALTER TABLE `our_team_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `our_team_img`
--
ALTER TABLE `our_team_img`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `portfolio_img`
--
ALTER TABLE `portfolio_img`
  MODIFY `portF_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `slider_data`
--
ALTER TABLE `slider_data`
  MODIFY `slider_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `slider_images`
--
ALTER TABLE `slider_images`
  MODIFY `slider_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `navigation_link`
--
ALTER TABLE `navigation_link`
  ADD CONSTRAINT `FK_Nav_links` FOREIGN KEY (`navigate_id`) REFERENCES `nav_link_modules` (`nav_link_module_id`);

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin_details` (`admin_id`),
  ADD CONSTRAINT `permissions_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `module_data` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
