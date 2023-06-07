
CREATE SCHEMA bms

-- bms.book definition

-- Drop table

-- DROP TABLE bms.book;

CREATE TABLE bms.book (
	book_id serial  NOT NULL,
	book_title varchar(300) NOT NULL,
	book_discribtion varchar(1000) NOT NULL,
	book_publisher varchar(50) NOT NULL,
	book_author varchar(50) NOT NULL,
	book_pages int4 NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
);




-- bms.store definition

-- Drop table

-- DROP TABLE bms.store;

CREATE TABLE bms.store (
	store_id serial  NOT NULL,
	store_name varchar(100) NOT NULL,
	store_code varchar(5) NOT NULL,
	address varchar(200) NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);


-- bms.audit definition

-- Drop table

-- DROP TABLE bms.audit;

CREATE TABLE bms.audit (
	audit_id serial  NOT NULL,
	audit_action varchar(100) NOT NULL,
	audit_data json NULL,
	audit_status varchar(50) NOT NULL,
	audit_error json NULL,
	audit_at timestamp NOT NULL,
	audit_by varchar(50) NOT NULL,
	CONSTRAINT audit_pkey PRIMARY KEY (audit_id)
);



-- bms.app_user definition

-- Drop table

-- DROP TABLE bms.app_user;

CREATE TABLE bms.app_user (
	user_id serial4 NOT NULL,
	username varchar(100) NOT NULL,
	full_name varchar(500) NOT NULL,
	"password" varchar(100) NOT NULL,
	email varchar(355) NOT NULL,
	user_type varchar(10) NOT NULL,
	active bool NULL DEFAULT true,
	created_at timestamp NULL,
	created_by varchar(100) NULL,
	updated_at timestamp NULL,
	updated_by varchar(100) NULL,
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_username_key UNIQUE (username)
);


-- bms.app_role definition

-- Drop table

-- DROP TABLE bms.app_role;

CREATE TABLE bms.app_role (
	role_id serial4 NOT NULL,
	role_name varchar(100) NOT NULL,
	CONSTRAINT role_pkey PRIMARY KEY (role_id),
	CONSTRAINT role_role_name_key UNIQUE (role_name)
);



-- bms.app_group definition

-- Drop table

-- DROP TABLE bms.app_group;

CREATE TABLE bms.app_group (
	group_id serial4 NOT NULL,
	group_name varchar(100) NOT NULL,
	CONSTRAINT group_group_name_key UNIQUE (group_name),
	CONSTRAINT group_pkey PRIMARY KEY (group_id)
);



-- bms.user_group definition

-- Drop table

-- DROP TABLE bms.user_group;

CREATE TABLE bms.user_group (
	user_group_id serial4 NOT NULL,
	user_id int4 NULL,
	group_id int4 NULL,
	CONSTRAINT user_group_pkey PRIMARY KEY (user_group_id)
);



-- bms.group_role definition

-- Drop table

-- DROP TABLE bms.group_role;

CREATE TABLE bms.group_role (
	group_role_id serial4 NOT NULL,
	group_id int4 NULL,
	role_id int4 NULL,
	CONSTRAINT group_role_pkey PRIMARY KEY (group_role_id)
);



-- bms.user_type definition

-- Drop table

-- DROP TABLE bms.user_type;

CREATE TABLE bms.user_type (
	user_type_id serial4 NOT NULL,
	user_type_name varchar(500) NOT NULL
);