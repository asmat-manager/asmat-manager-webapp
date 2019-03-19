CREATE TABLE asmat
(
  id           BIGINT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name   VARCHAR(50) NOT NULL,
  last_name    VARCHAR(50) NOT NULL,
  phone_number VARCHAR(10),
  email        VARCHAR(120),
  adherent     BOOLEAN     NOT NULL DEFAULT FALSE,
  street_no    VARCHAR(3),
  street       VARCHAR(200),
  postal_code  CHAR(5),
  city         VARCHAR(40)
);

CREATE TABLE user
(
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(40) NOT NULL,
  password VARCHAR(40) NOT NULL
);
