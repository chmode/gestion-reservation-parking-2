CREATE DATABASE IF NOT EXISTS parking_db;

USE parking_db;

CREATE TABLE user (
                      id_user BIGINT PRIMARY KEY AUTO_INCREMENT,
                      first_name VARCHAR(50),
                      last_name VARCHAR(50),
                      phone VARCHAR(20)
);

CREATE TABLE user_account (
                              id_account BIGINT PRIMARY KEY AUTO_INCREMENT,
                              id_user BIGINT,
                              email VARCHAR(100),
                              pwd VARCHAR(100),
                              reservation_nbr INT,
                              FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE
);

CREATE TABLE admin (
                       id_admin BIGINT PRIMARY KEY AUTO_INCREMENT,
                       first_name VARCHAR(50),
                       last_name VARCHAR(50),
                       phone VARCHAR(20)
);

CREATE TABLE admin_account (
                               id_adminacc BIGINT PRIMARY KEY AUTO_INCREMENT,
                               id_admin BIGINT,
                               email VARCHAR(100),
                               pwd VARCHAR(100),
                               FOREIGN KEY (id_admin) REFERENCES admin(id_admin) ON DELETE CASCADE
);

CREATE TABLE parking (
                         id_parking BIGINT PRIMARY KEY AUTO_INCREMENT,
                         type VARCHAR(50),
                         place_nbr INT
);

CREATE TABLE place (
                       id_place BIGINT PRIMARY KEY AUTO_INCREMENT,
                       id_parking BIGINT,
                       name VARCHAR(100),
                       price FLOAT,
                       state VARCHAR(50),
                       FOREIGN KEY (id_parking) REFERENCES parking(id_parking) ON DELETE CASCADE
);

CREATE TABLE reservation (
                             id_reservation BIGINT PRIMARY KEY AUTO_INCREMENT,
                             id_user BIGINT,
                             id_place BIGINT,
                             id_parking BIGINT,
                             date_in DATETIME,
                             date_out DATETIME,
                             hour_nbr INT,
                             FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE,
                             FOREIGN KEY (id_place) REFERENCES place(id_place) ON DELETE CASCADE,
                             FOREIGN KEY (id_parking) REFERENCES parking(id_parking) ON DELETE CASCADE
);

CREATE TABLE invoice (
                         id_invoice BIGINT PRIMARY KEY AUTO_INCREMENT,
                         id_reservation BIGINT,
                         total_amount FLOAT,
                         FOREIGN KEY (id_reservation) REFERENCES reservation(id_reservation) ON DELETE CASCADE
);
INSERT INTO `admin`(`id_admin`, `first_name`, `last_name`, `phone`) VALUES (1,'salah-eddine','ait ihsane','0654546785');
INSERT INTO `admin_account`(`id_admin`, `email`, `pwd`) VALUES (1,'salah-eddine@gmail.com','admin');
INSERT INTO `parking`(`type`, `place_nbr`) VALUES ('public',1);
INSERT INTO `parking`(`type`, `place_nbr`) VALUES ('entreprise',1);
INSERT INTO `parking`(`type`, `place_nbr`) VALUES ('residentiel,',1);