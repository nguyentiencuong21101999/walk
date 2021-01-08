SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE`user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fistName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lastName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role` int(10) NULL DEFAULT NULL,
  `createdTime` datetime(0) NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE`user2`  (
  `role` int(255) NOT NULL,
  `id` int(10) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE PROCEDURE`getInfoById`(in userId int)
BEGIN
	#Routine body goes here...
		select * from user WHERE id = userId;

END;

CREATE PROCEDURE`getUserByEmail`(in emails varchar(100))
BEGIN
	#Routine body goes here...
	select * from user WHERE email = emails;
	drop TABLE a;
END;

CREATE PROCEDURE`insertUser`(in emails VARCHAR(100),in passwords VARCHAR(100),in fistNames VARCHAR(100),in lastNames VARCHAR(50),in roles int)
BEGIN
	#Routine body goes here...
		INSERT INTO user (email,`password`,fistName,lastName,role) VALUES (emails,passwords,fistNames,lastNames,roles);
		
			SELECT * from `user` WHERE id = LAST_INSERT_ID();
END;

SET FOREIGN_KEY_CHECKS=1;