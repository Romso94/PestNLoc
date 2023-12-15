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
   YearOfBirth INT NOT NULL,
   Address VARCHAR(50) NOT NULL,
   Date_Permis_Issue DATE NOT NULL,
   Email VARCHAR(50) NOT NULL,
   Phone_Number VARCHAR(50) NOT NULL,
   Password VARCHAR(2500) NOT NULL,
   isAdmin boolean NOT NULL,
   Salt VARCHAR(50) NOT NULL,
   Country VARCHAR(150) NOT NULL,
   Gender VARCHAR(50) NOT NULL,
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
   isReserved boolean NOT NULL,
   Car_Power VARCHAR(50) NOT NULL,
   Car_Type VARCHAR(50) NOT NULL,
   Id_Agency INT NOT NULL,
   PRIMARY KEY(License_Plate),
   FOREIGN KEY(Id_Agency) REFERENCES Agency(Id_Agency)
);

CREATE TABLE Contract(
   Id_Contract INT NOT NULL AUTO_INCREMENT,
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
