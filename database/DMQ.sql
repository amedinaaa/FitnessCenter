-- Select query to pull all the customers from the database
SELECT * FROM Members;

-- Get all member names and id's for the a dropdown
SELECT memberID, name FROM Members;

-- Get all equipment data
SELECT * FROM Equipments;

-- Gather equipment data for dropdown
SELECT equipmentID, name FROM Equipments;

-- Gather all activities
SELECT activityID, name, Equipments.name as equipmentID FROM Activities 
INNER JOIN Equipments ON equipmentID = Equipments.equipmentID;

-- Gather activities for dropdown
SELECT activityID, name FROM Activities;

-- Gather all reservations
SELECT reservationID, Members.name as memberID, Activities.name as activityID, reservation_start, reservation_end FROM Reservations
INNER JOIN Members ON memberID = Members.memberID
INNER JOIN Activities on activityID = Activities.activityID;

-- Gather all reservations between two dates
-- 
SELECT reservationID, Members.name as memberID, Activities.name as activityID, reservation_start, reservation_end FROM Reservations
WHERE reservation_start <= :query_end_date AND reservation_start >= :query_start_date
INNER JOIN Members ON memberID = Members.memberID
INNER JOIN Activities on activityID = Activities.activityID;

-- Add new member
INSERT INTO Members(name, email, phone, join_date)
VALUES(:inputName, :inputEmail, :inputPhoneNumber, :inputJoinDate);

-- Create a new equipment
INSERT INTO Equipments(name, item_count)
VALUES(:inputName, :inputItemCount);

-- Create a new activity
INSERT INTO Activities(name, equipmentID)
VALUES(:inputName, :equipment_ID_from_dropdown)

-- Creating a new reservation
INSERT INTO Reservations(memberID, activityID, reservation_start, reservation_end)
VALUES(:member_id_from_dropdown, :activity_ID_from_dropdown, :inputReservationStart, :inputReservationEnd)

-- Update a reservations based on the user submission
UPDATE Reservations SET memberID = :member_id_from_dropdown, activityID = :activity_ID_from_dropdown, reservation_start = :inputReservationStart, reservation_end = :inputReservationEnd WHERE reservationID = :reservation_id_from_form;

-- Update a member based on the user submission
UPDATE Members SET name = :inputName, email = :inputEmail, phone = :inputPhoneNumber WHERE memberID = :member_id_from_dropdown;

-- Delete a member
-- Cascading deletion will remove all member's reservations
DELETE FROM Members WHERE memberID = :member_id_from_dropdown;

-- Delete a reservation
DELETE FROM Reservations WHERE reservationID = :reservation_id_gathered_from_table;

-- Delete a piece of equipment
-- Will also delete activities that have this equipment as well as reservations that have that activity
DELETE FROM Equipments WHERE equipmentID = :equipment_id_from_form;

