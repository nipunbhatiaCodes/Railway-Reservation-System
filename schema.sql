-- ============================================================================
-- CSE2003 | Object Oriented Programming using JAVA | B.Tech CSE Semester 3
-- Group 7: Railway Ticket Reservation System
-- Team:
--   Leader:   Akshay Bhardwaj (UID: 2510001212)
--   Member 1: Utkarsh Mishra  (UID: 2510001283)
--   Member 2: Nipun Bhatia    (UID: 2510001217)
--   Member 3: Shreyansh       (UID: 2510001258)
--
-- Database Schema: trains, passengers, tickets
-- ============================================================================

CREATE DATABASE IF NOT EXISTS railway_db;
USE railway_db;

-- 1. Trains Table
DROP TABLE IF EXISTS passengers;
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS trains;

CREATE TABLE trains (
    train_no INT PRIMARY KEY,
    train_name VARCHAR(100) NOT NULL,
    source_station VARCHAR(50) NOT NULL,
    dest_station VARCHAR(50) NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    duration_hours DECIMAL(4,2) NOT NULL,
    total_1a_seats INT DEFAULT 18,
    total_2a_seats INT DEFAULT 48,
    total_3a_seats INT DEFAULT 64,
    total_sl_seats INT DEFAULT 72,
    base_fare_sl DECIMAL(8,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tickets Table (Unit 4: JDBC PreparedStatement targets)
CREATE TABLE tickets (
    pnr VARCHAR(12) PRIMARY KEY,
    train_no INT NOT NULL,
    journey_date DATE NOT NULL,
    travel_class VARCHAR(10) NOT NULL, -- '1A', '2A', '3A', 'SL', 'CC'
    quota VARCHAR(20) DEFAULT 'GENERAL',
    total_passengers INT NOT NULL,
    total_fare DECIMAL(10,2) NOT NULL,
    booking_status VARCHAR(20) NOT NULL DEFAULT 'CONFIRMED', -- 'CONFIRMED', 'CANCELLED', 'PARTIALLY_CANCELLED'
    refund_amount DECIMAL(10,2) DEFAULT 0.00,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contact_phone VARCHAR(15),
    contact_email VARCHAR(100),
    FOREIGN KEY (train_no) REFERENCES trains(train_no) ON DELETE CASCADE
);

-- 3. Passengers Table
CREATE TABLE passengers (
    passenger_id INT AUTO_INCREMENT PRIMARY KEY,
    pnr VARCHAR(12) NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    berth_preference VARCHAR(20),
    allocated_coach VARCHAR(10),
    allocated_seat INT,
    allocated_berth_type VARCHAR(20), -- 'LB', 'MB', 'UB', 'SL', 'SU'
    status VARCHAR(20) NOT NULL DEFAULT 'CONFIRMED', -- 'CONFIRMED', 'CANCELLED', 'WL'
    FOREIGN KEY (pnr) REFERENCES tickets(pnr) ON DELETE CASCADE
);

-- Indexes for fast PNR and train schedule queries
CREATE INDEX idx_tickets_pnr ON tickets(pnr);
CREATE INDEX idx_passengers_pnr ON passengers(pnr);
CREATE INDEX idx_trains_route ON trains(source_station, dest_station);

-- Initial Mock Data
INSERT INTO trains (train_no, train_name, source_station, dest_station, departure_time, arrival_time, duration_hours, total_1a_seats, total_2a_seats, total_3a_seats, total_sl_seats, base_fare_sl) VALUES
(22436, 'Vande Bharat Express', 'New Delhi (NDLS)', 'Varanasi (BSB)', '06:00:00', '14:00:00', 8.00, 24, 52, 78, 0, 1200.00),
(12952, 'Mumbai Tejas Rajdhani', 'New Delhi (NDLS)', 'Mumbai Central (MMCT)', '16:55:00', '08:35:00', 15.67, 20, 54, 72, 0, 1950.00),
(12302, 'Howrah Rajdhani Express', 'New Delhi (NDLS)', 'Howrah Jn (HWH)', '16:50:00', '09:55:00', 17.08, 18, 48, 64, 0, 1880.00),
(12626, 'Kerala Superfast Express', 'New Delhi (NDLS)', 'Trivandrum Central (TVC)', '20:10:00', '14:15:00', 42.08, 10, 36, 64, 72, 680.00),
(12004, 'Lucknow Shatabdi Express', 'New Delhi (NDLS)', 'Lucknow Charbagh (LKO)', '06:10:00', '12:40:00', 6.50, 0, 0, 56, 0, 850.00),
(12431, 'Trivandrum Rajdhani', 'Hazrat Nizamuddin (NZM)', 'Trivandrum Central (TVC)', '06:16:00', '19:40:00', 37.40, 16, 44, 64, 0, 2150.00),
(12138, 'Punjab Mail', 'Firozpur Cantt (FZR)', 'Mumbai CSMT (CSMT)', '21:40:00', '07:35:00', 33.92, 10, 28, 48, 72, 590.00),
(12259, 'Sealdah Bikaner AC Duronto', 'Sealdah (SDAH)', 'Bikaner Jn (BKN)', '17:00:00', '13:50:00', 20.83, 14, 40, 64, 0, 1720.00);

-- Sample Ticket
INSERT INTO tickets (pnr, train_no, journey_date, travel_class, quota, total_passengers, total_fare, booking_status, contact_phone, contact_email) VALUES
('2849182746', 22436, '2026-12-15', '3A', 'GENERAL', 2, 2840.00, 'CONFIRMED', '9876543210', 'shreyansh@example.com');

INSERT INTO passengers (pnr, name, age, gender, berth_preference, allocated_coach, allocated_seat, allocated_berth_type, status) VALUES
('2849182746', 'Akshay Bhardwaj', 21, 'Male', 'Lower', 'C1', 12, 'LB', 'CONFIRMED'),
('2849182746', 'Utkarsh Mishra', 20, 'Male', 'Window', 'C1', 13, 'MB', 'CONFIRMED');
