SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

--
-- Getting syntax errors when using the recommended CREATE OR REPLACE in the modules.
--

--
--  Creating our Members Table
--
CREATE TABLE Members (
    memberID int NOT NULL AUTO_INCREMENT,
    name varchar(125) NOT NULL,
    email varchar(125) NOT NULL,
    phone varchar(125) NOT NULL,
    join_date date NOT NULL,
    PRIMARY KEY(memberID)
);

--
--  Creating our Equipments Table
--
CREATE TABLE Equipments(
    equipmentID int NOT NULL AUTO_INCREMENT,
    name varchar(125) NOT NULL,
    item_count int NOT NULL,
    PRIMARY KEY(equipmentID)
);

--
--  Creating our Activities Table
--
CREATE TABLE Activities (
    activityID int NOT NULL AUTO_INCREMENT,
    name varchar(125) NOT NULL,
    equipmentID int NOT NULL,
    PRIMARY KEY(activityID),
    FOREIGN KEY(equipmentID) REFERENCES Equipments(equipmentID)
    ON DELETE CASCADE
);

--
--  Creating our Reservations Table
--
CREATE TABLE Reservations (
    reservationID int NOT NULL AUTO_INCREMENT,
    memberID int NOT NULL,
    activityID int NOT NULL,
    reservation_start datetime NOT NULL,
    reservation_end datetime NOT NULL,
    PRIMARY KEY(reservationID),
    FOREIGN KEY(memberID) REFERENCES Members(memberID) ON DELETE CASCADE,
    FOREIGN KEY(activityID) REFERENCES Activities(activityID) ON DELETE CASCADE
);

--
--  Inserting sample member data
--
INSERT INTO Members(name, email, phone, join_date)
    VALUES('Abhram Medina', 'abhram@gmail.com', '555-432-1987', '2020-01-01'),
    ('Chris McDaniel', 'chris@yahoo.com', '555-432-9856', '2020-03-01'),
    ('Bob Davis', 'bob@davisinc.com', '555-465-7410', '2022-12-01');

--
--  Inserting sample equipment data
--
INSERT INTO Equipments(name, item_count)
    VALUES('Gym', 1),
    ('Squash Court', 1),
    ('Treadmill', 5),
    ('Stationary Bike', 5);

--
--  Inserting sample activities data
--
INSERT INTO Activities(name, equipmentID)
    VALUES('Basketball', 1),
    ('Running in Place', 3),
    ('Squash', 2),
    ('Zumba', 1),
    ('Spin Class', 4);

--
--  Inserting sample reservations data
--
INSERT INTO Reservations(memberID, activityID, reservation_start, reservation_end)
    VALUES(1, 1, '2023-08-01 11:00:00', '2023-08-01 13:00:00'),
    (2, 1, '2023-08-01 08:00:00', '2023-08-01 12:00:00'),
    (1, 4, '2023-08-02 17:00:00', '2023-08-01 19:00:00'),
    (3, 3, '2023-08-03 10:00:00', '2023-08-03 13:00:00'),
    (2, 2, '2023-08-05 12:00:00', '2023-08-05 13:00:00');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;