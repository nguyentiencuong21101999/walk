SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `activity`  (
  `activity_id` int(0) NOT NULL AUTO_INCREMENT,
  `steps_number` int(0) NOT NULL,
  `time_begin` datetime(0) NULL DEFAULT NULL,
  `time_end` datetime(0) NULL DEFAULT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`activity_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `address`  (
  `address_id` int(0) NOT NULL AUTO_INCREMENT,
  `address_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ward_id` int(0) NULL DEFAULT NULL,
  `district_id` int(0) NULL DEFAULT NULL,
  `province_id` int(0) NULL DEFAULT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`address_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `district`  (
  `district_id` int(0) NOT NULL,
  `district_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `district_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `province_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`district_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `event`  (
  `event_id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail_event` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time_begin` datetime(0) NULL DEFAULT NULL,
  `time_end` datetime(0) NULL DEFAULT NULL,
  `steps_finish` int(0) NULL DEFAULT NULL,
  `point` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `event_activity`  (
  `event_id` int(0) NOT NULL,
  `activity_id` int(0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `province`  (
  `province_id` int(0) NOT NULL,
  `province_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `province_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`province_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `user`  (
  `user_id` int(0) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time_create` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `role` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `user_event`  (
  `user_id` int(0) NULL DEFAULT NULL,
  `event_id` int(0) NULL DEFAULT NULL,
  `time_join` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `user_info`  (
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `birthday` datetime(0) NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int(0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `ward`  (
  `ward_id` int(0) NOT NULL,
  `ward_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ward_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `district_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`ward_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE PROCEDURE `add_activity`(IN steps_numbers INT, IN time_begins VARCHAR ( 255 ), IN time_ends VARCHAR ( 255 ), IN user_ids INT)
BEGIN
	INSERT INTO activity ( steps_number, time_begin, time_end, user_id )
	VALUES
		( steps_numbers, time_begins, time_ends, user_ids );
	set @activity_id = LAST_INSERT_ID();
	 call get_event_joined(user_ids);
	 SELECT @activity_id as activity_id;
	 
	 
	 
END;

CREATE PROCEDURE `add_activity_event`(IN event_ids INT, IN activity_ids INT)
BEGIN
	INSERT INTO event_activity ( event_id, activity_id )
	VALUES
		( event_ids, activity_ids );
	COMMIT;

END;

CREATE PROCEDURE `add_event`(IN names VARCHAR ( 255 ),
	IN detail_events VARCHAR ( 255 ),
	IN time_begins datetime		,
	IN time_ends datetime,
	IN steps_finishs INT,
	IN points INT)
BEGIN

	INSERT INTO `event` ( `name`, detail_event, time_begin, time_end, steps_finish, point )
	VALUES
		( names, detail_events, time_begins, time_ends, steps_finishs, points );
		
	SELECT LAST_INSERT_ID() as event_id;

END;

CREATE PROCEDURE `all_event`(in limits int,in offsets int)
BEGIN
	#Routine body goes here...
	SELECT * FROM `event`
	LIMIT limits
	OFFSET offsets;
	

END;

CREATE PROCEDURE `case`(in user_ids int)
BEGIN
	#Routine body goes here...
	SELECT firstname,lastname,birthday,gender,phone,address_name,ward,district,province FROM (
	SELECT
		address.user_id,
		address_name,
		CONCAT( ward_type, ' ', ward_name ) AS ward,
		CONCAT( district_type, ' ', district_name ) AS district,
		CONCAT( province_type, ' ', province_name ) AS province 
	FROM
		address
		INNER JOIN ward ON address.ward_id = ward.ward_id
		INNER JOIN district ON district.district_id = address.district_id
		INNER JOIN province ON province.province_id = address.province_id 

		) as address
		INNER JOIN user_info on address.user_id = user_info.user_id
		WHERE user_info.user_id = user_ids;
	 
		
END;

CREATE PROCEDURE `get_activity`(IN user_ids INT,
	IN types VARCHAR ( 255 ))
SP: BEGIN
	DECLARE
		SPError CONDITION FOR SQLSTATE '45000';
	IF
		( types = 'day' ) THEN
		set @time = CURRENT_DATE;
		SELECT
			user_id,
			@time AS date,
			SUM( steps_number ) AS total_steps 
		FROM
			activity 
		WHERE
			user_id = user_ids 
			AND activity.time_begin >= CURRENT_DATE 
			AND activity.time_end < DATE_ADD( CURRENT_DATE, INTERVAL 1 DAY ) 
		GROUP BY
			steps_number;
		
		ELSEIF ( types = 'week' ) THEN
		
		SET @first_day_of_week = SUBDATE(
			CURRENT_DATE,
		WEEKDAY( CURRENT_DATE ));
		
		SET @last_day_of_week = ADDDATE(
			@first_day_of_week,
		6 - WEEKDAY( @first_day_of_week ));-- 		 while  @first_day_of_week <= CURRENT_DATE do
		WHILE
				@first_day_of_week <= @last_day_of_week DO
			SELECT COALESCE
				( user_id, user_ids ) AS user_id,
				COALESCE ( SUM( steps_number ), 0 ) AS total_steps,
				@first_day_of_week AS date 
			FROM
				activity 
			WHERE
				user_id = user_ids 
				AND time_begin >= @first_day_of_week 
				AND time_end < date_add( @first_day_of_week, INTERVAL 1 DAY );
			
			SET @first_day_of_week = DATE_ADD( @first_day_of_week, INTERVAL 1 DAY );
			
		END WHILE;
		
		ELSEIF ( types = 'month' ) THEN
		
		SET @first_day_of_month = DATE_SUB( CURRENT_DATE, INTERVAL DAYOFMONTH( CURRENT_DATE )- 1 DAY );
		
		SET @last_day_of_month = LAST_DAY( CURRENT_DATE );
		
		SET @weeks = WEEK ( @last_day_of_month, 5 ) - WEEK ( DATE_SUB( @last_day_of_month, INTERVAL DAYOFMONTH( @last_day_of_month )- 1 DAY ), 5 ) + 1;-- tuan 1
		
		SET @first_day_of_week = SUBDATE(
			@first_day_of_month,
		WEEKDAY( @first_day_of_month ));
		
		SET @last_day_of_week = ADDDATE(
			@first_day_of_month,
		6 - WEEKDAY( @first_day_of_month ));
		
		SET @i = 1;
		WHILE
				@i <= @weeks DO
			SELECT COALESCE
				( user_id, user_ids ) AS user_id,
				COALESCE ( SUM( steps_number ), 0 ) AS total_steps,
				@first_day_of_week AS start_time,
				@last_day_of_week AS end_time
			FROM
				activity 
			WHERE
				user_id = user_ids 
				AND time_begin >= @first_day_of_week 
				AND time_end < DATE_ADD( @last_day_of_week, INTERVAL 1 DAY );
			
			SET @first_day_of_week = DATE_ADD( @last_day_of_week, INTERVAL 1 DAY );
			
			SET @last_day_of_week = ADDDATE(
				@first_day_of_week,
			6 - WEEKDAY( @first_day_of_week ));
			SET @i = @i + 1;
			
		END WHILE;
		ELSE SIGNAL SPError 
		SET message_text = "TypeIsNotValid";
	END IF;

END SP;

CREATE PROCEDURE `get_activity_by_event`(IN user_ids INT, IN event_ids INT)
SP:BEGIN
	#Routine body goes here...
	DECLARE
		SPError CONDITION FOR SQLSTATE '45000';
		if EXISTS (SELECT user_event.user_id
	FROM
		user_event
		INNER JOIN `event` ON user_event.event_id = `event`.event_id 
	WHERE
		user_event.user_id = user_ids and user_event.event_id = event_ids) THEN
	SELECT
		`event`.event_id,
		steps_finish,
		COALESCE ( SUM( steps_number ), 0 ) AS total_steps,
		lastname 
	FROM
		event_activity
		INNER JOIN `event` ON `event`.event_id = event_activity.event_id
		INNER JOIN activity ON activity.activity_id = event_activity.activity_id
		INNER JOIN user_info ON user_info.user_id = activity.user_id 
	WHERE
		`event`.event_id = event_ids 
		AND activity.user_id = user_ids 
	GROUP BY
		`event`.event_id;
		else
		 SIGNAL SPError 
		SET message_text = "IsNotJoinEvent";
	END IF;

END SP;

CREATE PROCEDURE `get_address_by_id`(IN id INT)
BEGIN#Routine body goes here...
	SELECT
		address_name,
		CONCAT( ward_type, ' ', ward_name ) AS ward,
		CONCAT( district_type, ' ', district_name ) AS district,
		CONCAT( province_type, ' ', province_name ) AS province 
	FROM
		address
		INNER JOIN ward ON address.ward_id = ward.ward_id
		INNER JOIN district ON district.district_id = address.district_id
		INNER JOIN province ON province.province_id = address.province_id 
	WHERE
		address.user_id = id;
END;

CREATE PROCEDURE `get_district_address`()
BEGIN
	DECLARE
	EXIT HANDLER FOR SQLEXCEPTION BEGIN
			ROLLBACK;
		RESIGNAL;
		
	END;
	START TRANSACTION;
	SELECT
		* 
	FROM
		district 
	ORDER BY
		district_name ASC;
	COMMIT;

END;

CREATE PROCEDURE `get_event`(IN event_ids INT)
SP : BEGIN#Routine body goes here...
	DECLARE
		SPError CONDITION FOR SQLSTATE '45000';
	IF
		EXISTS ( SELECT * FROM `event` WHERE event_id = event_ids ) THEN
		SELECT
			* 
		FROM
			`event` 
		WHERE
			event_id = event_ids;
		ELSE SIGNAL SPError 
		SET message_text = "EventIsNotValid";
		
	END IF;

END SP;

CREATE PROCEDURE `get_event_joined`(IN user_ids INT)
SP:BEGIN#Routine body goes here...
	DECLARE
		SPError CONDITION FOR SQLSTATE '45000';
		if EXISTS (SELECT user_event.user_id
	FROM
		user_event
		INNER JOIN `event` ON user_event.event_id = `event`.event_id 
	WHERE
		user_event.user_id = user_ids)  THEN
	SELECT
		`event`.event_id,
		name,
		detail_event,
		image,
		time_begin,
		time_end,
		steps_finish,
		point,
		time_join 
	FROM
		user_event
		INNER JOIN `event` ON user_event.event_id = `event`.event_id 
	WHERE
		user_event.user_id = user_ids;
		else
		 SIGNAL SPError 
		SET message_text = "IsNotJoinEvent";
	END IF;
END SP;

CREATE PROCEDURE `get_profile`(IN emails VARCHAR ( 255 ))
SP : BEGIN#Routine body goes here...
	DECLARE
		SPError CONDITION FOR SQLSTATE '45000';
	IF
		EXISTS ( SELECT * FROM `user` WHERE email = emails ) THEN
			CALL get_user( emails );
		SET @user_id = ( SELECT user_id FROM `user` WHERE email = emails );
		SELECT
			firstname,
			lastname,
			birthday,
			gender,
			phone,
			address_name,
			ward,
			district,
			province 
		FROM
			(
			SELECT
				address.user_id,
				address_name,
				CONCAT( ward_type, ' ', ward_name ) AS ward,
				CONCAT( district_type, ' ', district_name ) AS district,
				CONCAT( province_type, ' ', province_name ) AS province 
			FROM
				address
				INNER JOIN ward ON address.ward_id = ward.ward_id
				INNER JOIN district ON district.district_id = address.district_id
				INNER JOIN province ON province.province_id = address.province_id 
			) AS address
			INNER JOIN user_info ON address.user_id = user_info.user_id 
		WHERE
			user_info.user_id = @user_id;
		ELSE SIGNAL SPError 
		SET message_text = "EmailIsNotValid";
		
	END IF;

END SP;

CREATE PROCEDURE `get_province_address`()
BEGIN
	DECLARE
	EXIT HANDLER FOR SQLEXCEPTION BEGIN
			ROLLBACK;
		RESIGNAL;
		
	END;
	START TRANSACTION;
	SELECT
		* 
	FROM
		province 
	ORDER BY
		province_name ASC;
	COMMIT;

END;

CREATE PROCEDURE `get_rank`(in types VARCHAR(255),in limits INT,in offsets INT)
SP: BEGIN
	DECLARE
		SPError CONDITION FOR SQLSTATE '45000';
	IF
		( types = 'day' ) THEN
		SELECT user_info.lastname,
					SUM(steps_number) as total_steps,
					ROW_NUMBER() OVER (ORDER BY SUM(steps_number) DESC) `rank`
		from activity INNER JOIN user_info on user_info.user_id = activity.user_id
		
		WHERE time_begin >= CURRENT_DATE and time_end < DATE_ADD(CURRENT_DATE,interval 1 day)
		GROUP BY user_info.user_id
		ORDER BY total_steps DESC
		LIMIT limits
		OFFSET offsets;
		ELSEIF (types = 'month') THEN
			SELECT user_info.lastname,
					SUM(steps_number) as total_steps,
					ROW_NUMBER() OVER(ORDER BY SUM(steps_number) DESC) AS `rank` 
		from activity INNER JOIN user_info on user_info.user_id = activity.user_id
		WHERE 
		MONTH(time_begin) > MONTH(CURRENT_DATE)-1 and MONTH(time_end) < MONTH(CURRENT_DATE) + 1
		GROUP BY user_info.user_id
		ORDER BY total_steps DESC
		LIMIT limits
		OFFSET offsets;
		ELSE SIGNAL SPError 
		SET message_text = "TypeIsNotValid";
	END IF;

END SP;

CREATE PROCEDURE `get_rank_by_event`(IN event_ids INT, IN limits INT, IN offsets INT)
SP : BEGIN
	DECLARE
		SPError CONDITION FOR SQLSTATE '45000';
	IF
		EXISTS ( SELECT event_id from `event` WHERE event_id = event_ids ) THEN
		SELECT
			`event`.event_id,
			steps_finish,
			COALESCE ( SUM( steps_number ), 0 ) AS total_steps,
			lastname,
			ROW_NUMBER () OVER ( ORDER BY SUM( steps_number ) DESC ) AS `rank` 
		FROM
			event_activity
			INNER JOIN `event` ON `event`.event_id = event_activity.event_id
			INNER JOIN activity ON activity.activity_id = event_activity.activity_id
			INNER JOIN user_info ON user_info.user_id = activity.user_id 
		WHERE
			`event`.event_id = event_ids 
		GROUP BY
			user_info.user_id 
			LIMIT limits OFFSET offsets;-- 	ORDER BY total_steps  DESC ;
		ELSE SIGNAL SPError 
		SET message_text = "EventIsNotValid";
		
	END IF;

END SP;

CREATE PROCEDURE `get_steps_by_month`(IN user_ids int)
BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any error in the transaction
    END;
		START TRANSACTION;
		SET @first_day_of_month = DATE_SUB(CURRENT_DATE,INTERVAL DAYOFMONTH(CURRENT_DATE)-1 DAY) ;
		SET @last_day_of_month = LAST_DAY(CURRENT_DATE);
	#Routine body goes here...
	SELECT user_id,sum(steps_number)
	from activity
	WHERE user_id = user_ids
	and time_begin >= @first_day_of_month
	and time_end < @last_day_of_month;
	COMMIT;
END;

CREATE PROCEDURE `get_steps_by_week`(in user_ids int)
BEGIN
	#Routine body goes here...
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any error in the transaction
    END;
		start transaction;
		set @day_first_week = SUBDATE(CURRENT_DATE, WEEKDAY(CURRENT_DATE)) ;
		set @day_last_week = ADDDATE(CURRENT_DATE,6 - WEEKDAY(CURRENT_DATE)) ;
		select 
		user_id,sum(steps_number) as tatol_steps, 
		SUBDATE(CURRENT_DATE, WEEKDAY(CURRENT_DATE)) as start_day,
		ADDDATE(CURRENT_DATE,6 - WEEKDAY(CURRENT_DATE)) as last_day,
		WEEK(CURRENT_DATE,5) - WEEK(DATE_SUB(CURRENT_DATE, INTERVAL DAYOFMONTH(CURRENT_DATE)-1 DAY),5) + 1 as week_of_month
		from activity
		where 
		user_id = user_ids 
		and time_begin >= @day_first_week
		and time_end < DATE_ADD(@day_last_week, INTERVAL 1 DAY);     
COMMIT;
END;

CREATE PROCEDURE `get_user`(IN emails VARCHAR ( 255 ))
SP : BEGIN
	DECLARE
		SPError CONDITION FOR SQLSTATE '45000';
	IF
		EXISTS ( SELECT * FROM `user` WHERE email = emails ) THEN
		SELECT
			* 
		FROM
			`user` 
		WHERE
			email = emails;
		ELSE SIGNAL SPError 
		SET message_text = "EmailIsNotValid";
	END IF;
END SP;

CREATE PROCEDURE `get_user_event`(IN user_ids INT, IN event_ids INT)
BEGIN#Routine body goes here...
	DECLARE
	EXIT HANDLER FOR SQLEXCEPTION BEGIN
			ROLLBACK;
		RESIGNAL;
		
	END;
	START TRANSACTION;
	SELECT
		* 
	FROM
		user_event 
	WHERE
		user_id = user_ids 
		AND event_id = event_ids;
	COMMIT;

END;

CREATE PROCEDURE `get_ward_address`()
BEGIN
		DECLARE
	EXIT HANDLER FOR SQLEXCEPTION BEGIN
			ROLLBACK;
		RESIGNAL;
		
	END;
	START TRANSACTION;
	
	select * from ward 
	ORDER BY ward_name ASC;
	COMMIT;
END;

CREATE PROCEDURE `insert_user`(IN emails VARCHAR ( 255 ),
	IN `password` VARCHAR ( 255 ),
	IN firstname VARCHAR ( 255 ),
	IN lastname VARCHAR ( 255 ),
	IN birthday VARCHAR ( 255 ),
	IN gender VARCHAR ( 255 ),
	IN phone VARCHAR ( 255 ),
	IN address_name VARCHAR ( 255 ),
	IN ward VARCHAR ( 255 ),
	IN district VARCHAR ( 255 ),
	IN province VARCHAR ( 255 ))
SP: BEGIN
	DECLARE SPError  CONDITION FOR SQLSTATE '45000';
	DECLARE
	EXIT HANDLER FOR SQLEXCEPTION BEGIN
			ROLLBACK;
		RESIGNAL;
		
	END;
	IF NOT EXISTS( SELECT email FROM `user` WHERE email = emails ) THEN
			START TRANSACTION;
		INSERT INTO `user` ( email, `password`, role )
		VALUES
			( emails, `password`, 1 );
			
		SET @user_id = LAST_INSERT_ID();
		
		INSERT INTO address ( address_name, ward_id, district_id, province_id, user_id )
		VALUES
			( address_name, ward, district, province, @user_id );
		INSERT INTO user_info ( firstname, lastname, birthday, gender, phone, user_id )
		VALUES
			( firstname, lastname, birthday, gender, phone, @user_id );
		COMMIT;
		CALL get_profile(emails);
ELSE
		SIGNAL SPError 
		SET message_text = "EmailExist";
	END IF;
 
END SP;

CREATE PROCEDURE `Join_event`(IN user_ids INT, IN event_ids INT)
SP : BEGIN
	DECLARE
		SPError CONDITION FOR SQLSTATE '45000';
	IF
		NOT EXISTS ( SELECT event_id FROM `event` WHERE event_id = event_ids ) THEN
			SIGNAL SPError 
			SET message_text = "EventIsNotValid";
		
		ELSEIF NOT EXISTS ( SELECT event_id FROM user_event WHERE user_event.user_id = user_ids AND user_event.event_id = event_ids ) THEN
		INSERT INTO user_event ( user_id, event_id )
		VALUES
			( user_ids, event_ids );
		ELSE SIGNAL SPError 
		SET message_text = "JoinFail";
		
	END IF;

END SP;

CREATE PROCEDURE `upload_avatar`(user_ids int , avatars VARCHAR(255))
BEGIN
	#Routine body goes here...
	UPDATE user_info 
	SET avatar = avatars 
	WHERE user_info.user_id = user_ids;
	
	SELECT avatar from user_info 
	WHERE user_id = user_ids;

END;

CREATE PROCEDURE `upload_image`(in event_ids int, in images VARCHAR(255))
BEGIN
	#Routine body goes here...
	UPDATE `event` 
	SET image = images
	WHERE event_id = event_ids;
	SELECT * from `event` WHERE event_id = event_ids;
	COMMIT;
END;

SET FOREIGN_KEY_CHECKS=1;