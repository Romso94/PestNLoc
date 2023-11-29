 SET FOREIGN_KEY_CHECKS = 0;
 Drop Table if exists Agency ;
 Drop Table if exists Car ;
 Drop Table if exists client ;
 Drop Table if exists contract ;
 SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE Agency(
   Id_Agency INT NOT NULL AUTO_INCREMENT,
   Agency_Name VARCHAR(50) NOT NULL,
   Address VARCHAR(50) NOT NULL,
   Phone_Number VARCHAR(50) NOT NULL,
   Email VARCHAR(50) NOT NULL,
   Password VARCHAR(2500) NOT NULL,
   isAdmin boolean NOT NULL,
   Salt VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_Agency),
   UNIQUE(Agency_Name),
   UNIQUE(Address),
   UNIQUE(Phone_Number),
   UNIQUE(Email)
);

CREATE TABLE Client(
   Id_Client INT NOT NULL AUTO_INCREMENT,
   LastName VARCHAR(50) NOT NULL,
   Name VARCHAR(50) NOT NULL,
   Age INT NOT NULL,
   Address VARCHAR(50) NOT NULL,
   Date_Permis_Issue DATE NOT NULL,
   Email VARCHAR(50) NOT NULL,
   Phone_Number VARCHAR(50) NOT NULL,
   Password VARCHAR(2500) NOT NULL,
   isAdmin boolean NOT NULL,
   Salt VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_Client),
   UNIQUE(LastName),
   UNIQUE(Address),
   UNIQUE(Email),
   UNIQUE(Phone_Number)
);

CREATE TABLE Car(
   License_Plate VARCHAR(50) NOT NULL,
   Model VARCHAR(50) NOT NULL,
   Brand VARCHAR(50) NOT NULL,
   Fuel_State varchar(50) NOT NULL,
   Car_Power VARCHAR(50) NOT NULL,
   Car_Type VARCHAR(50) NOT NULL,
   Id_Agency INT NOT NULL,
   PRIMARY KEY(License_Plate),
   FOREIGN KEY(Id_Agency) REFERENCES Agency(Id_Agency)
);

CREATE TABLE Contract(
   Id_Contract INT NOT NULL AUTO_INCREMENT,
   Contract_Availability INT NOT NULL,
   Start_Date DATE NOT NULL,
   Price INT NOT NULL,
   End_Date DATE NOT NULL,
   Id_Client INT NOT NULL,
   License_Plate VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_Contract),
   UNIQUE(License_Plate),
   FOREIGN KEY(Id_Client) REFERENCES Client(Id_Client),
   FOREIGN KEY(License_Plate) REFERENCES Car(License_Plate)
);


    
INSERT INTO client (LastName,Name,Age,Address,Date_Permis_Issue,Email,Phone_Number,Password,Salt) values ('Doe','Florian',25,'123 Main retgzgzeSt','2022-01-01','john.doee@example.com','095403495','motdepasse123','test');
Select * from client;

INSERT INTO agency(Agency_Name,Address,Phone_Number,Email,Password,Salt) values ('Test1','TrucMachin',034567,'test.truc@gmail.com','truc',"salt");
SELECT * from Agency;

INSERT INTO car (License_Plate,Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency) values ("FT056TK","M4","BMW",100,"500ch","Sports",1);
SELECT * from car; 



INSERT INTO contract (Contract_Availability,Start_Date,Price,End_Date,Id_Client,License_Plate) values (20230217,20230417,150,20240317,2,"FT056TK");
SELECT * from contract; 

SELECT * from client ;
SELECT * from contract;
SELECT * from car;
SELECT * from agency;
