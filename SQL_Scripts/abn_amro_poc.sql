DROP DATABASE IF EXISTS abn_amro;

CREATE DATABASE abn_amro;

USE abn_amro;

DROP TABLE IF EXISTS Customers;

CREATE TABLE Customers (
    customer_id  INT NOT NULL AUTO_INCREMENT,
    name  VARCHAR(50) NOT NULL,
    address VARCHAR(150),
    email_id VARCHAR(40),
    phone_number VARCHAR(15),
    
    PRIMARY KEY (customer_id)
);

ALTER TABLE Customers AUTO_INCREMENT=1001;

DROP TABLE IF EXISTS Accounts;

CREATE TABLE  Accounts(
    account_id  INT NOT NULL AUTO_INCREMENT,
    balance  DOUBLE  NOT NULL,
    open_date DATE,
    status VARCHAR(15),
    customer_id INT ,
    
    PRIMARY KEY (account_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
ALTER TABLE Accounts AUTO_INCREMENT=9001;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
	user_name VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    account_id INT ,
    role VARCHAR(15),
    
    PRIMARY KEY (user_name),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);

#Temp Data Insertion to customers
INSERT INTO Customers (name, address, email_id, phone_number) VALUES ("Jaya Sai Krishna Kalluri", "Tenali ,A.P, INDIA" ,"kallurikrishna92@gmail.com","9492345152");

INSERT INTO Customers (name, address, email_id, phone_number) VALUES ("Venkat Rao Kondapalli", "Vetlapalam ,A.P, INDIA" ,"venkiking007@gmail.com","9177771161");

INSERT INTO Customers (name, address, email_id, phone_number) VALUES ("Giri Vanam", "Tadepalligudem ,A.P, INDIA" ,"vvvgiri@gmail.com","91xxxxxxxx");


#Temp Data Insertion to accounts.
INSERT INTO Accounts (balance,open_date,status,customer_id) VALUES (1500, "2018-01-01","ACTIVE",1001);

INSERT INTO Accounts (balance,open_date,status,customer_id) VALUES (2000, "2018-01-02","ACTIVE",1002);

INSERT INTO Accounts (balance,open_date,status,customer_id) VALUES (4500, "2018-02-01","ACTIVE",1003);


#Temp data insertion to Users.
INSERT INTO Users(user_name,password,account_id,role) VALUES ("krishna","admin",9001,"ADMIN");

INSERT INTO Users(user_name,password,account_id,role) VALUES ("venkat","password",9001,"USER");

INSERT INTO Users(user_name,password,account_id,role) VALUES ("giri","password",9001,"USER");



select * from Customers;
select * from Accounts;
select * from Users;
