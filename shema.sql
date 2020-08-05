CREATE DATABASE IF NOT EXISTS hostel_world;

USE hostel_world;

DROP TABLE IF EXISTS hostels;
CREATE TABLE hostels (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(120),
  address VARCHAR(120),
  PRIMARY KEY(id)
);

DROP TABLE IF EXISTS images;
CREATE TABLE images (
  id INT NOT NULL AUTO_INCREMENT,
  file_name VARCHAR(20),
  url VARCHAR(255),
  description VARCHAR(255),
  hostel_id INT,
  FOREIGN KEY(hostel_id)
    REFERENCES hostels(id)
    ON DELETE CASCADE
)

