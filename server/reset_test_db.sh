# Generate back up -> sudo mysqldump -u root -p testslack > testslack.sql

mysql -uroot -p <<MYSQL_SCRIPT
DROP DATABASE testslack;
CREATE DATABASE testslack;
USE testslack;
SOURCE testslack.sql;
MYSQL_SCRIPT
