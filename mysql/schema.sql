CREATE DATABASE `onlinestore` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `address` varchar(128) NOT NULL,
  `city` varchar(32) NOT NULL,
  `postal_code` varchar(32) NOT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `rights` tinyint(1) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `theme` (
  `theme_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `description` text DEFAULT NULL,
  `picture_url` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`theme_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `price` float NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `age` int(11) NOT NULL,
  `piece_count` int(11) NOT NULL,
  `availability` varchar(32) NOT NULL,
  `description` text DEFAULT NULL,
  `theme_id` int(11) DEFAULT NULL,
  `picture_url1` varchar(128) DEFAULT NULL,
  `picture_url2` varchar(128) DEFAULT NULL,
  `picture_url3` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `product_FK_1` (`theme_id`),
  CONSTRAINT `product_FK_1` FOREIGN KEY (`theme_id`) REFERENCES `theme` (`theme_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `total` double DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `order_FK` (`customer_id`),
  CONSTRAINT `order_FK` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `order_product` (
  `order_product_id` int(11) NOT NULL AUTO_INCREMENT,
  `price` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`order_product_id`),
  KEY `order_product_FK` (`order_id`),
  KEY `order_product_FK_1` (`product_id`),
  CONSTRAINT `order_product_FK` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `order_product_FK_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
