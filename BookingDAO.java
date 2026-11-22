package railway.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import railway.model.Passenger;
import railway.model.Train;

/**
 * CSE2003 - Unit 4: JDBC with PreparedStatement for PNR queries & Transactions
 * Group 7: Railway Ticket Reservation System
 */
public class BookingDAO {
    private static final String URL = "jdbc:mysql://localhost:3306/railway_db";
    private static final String USER = "root";
    private static final String PASS = "password";

    // Obtain connection
    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASS);
    }

    /**
     * Query Train schedule and seats using PreparedStatement
     */
    public Train getTrainByNumber(int trainNo) {
        String sql = "SELECT * FROM trains WHERE train_no = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, trainNo);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Train(
                        rs.getInt("train_no"),
                        rs.getString("train_name"),
                        rs.getString("source_station"),
                        rs.getString("dest_station"),
                        rs.getString("departure_time"),
                        rs.getString("arrival_time"),
                        rs.getDouble("base_fare_sl"),
                        new int[]{
                            rs.getInt("total_1a_seats"),
                            rs.getInt("total_2a_seats"),
                            rs.getInt("total_3a_seats"),
                            rs.getInt("total_sl_seats")
                        }
                    );
                }
            }
        } catch (SQLException e) {
            System.err.println("Database error in getTrainByNumber: " + e.getMessage());
        }
        return null;
    }

    /**
     * Save Ticket and Passengers inside a single Atomic Transaction using PreparedStatement
     */
    public boolean saveTicket(String pnr, int trainNo, String date, String travelClass, 
                              double totalFare, Passenger[] passengers, String phone, String email) {
        String ticketSql = "INSERT INTO tickets (pnr, train_no, journey_date, travel_class, total_passengers, total_fare, booking_status, contact_phone, contact_email) VALUES (?, ?, ?, ?, ?, ?, 'CONFIRMED', ?, ?)";
        String passengerSql = "INSERT INTO passengers (pnr, name, age, gender, berth_preference, allocated_coach, allocated_seat, allocated_berth_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'CONFIRMED')";

        Connection conn = null;
        try {
            conn = getConnection();
            conn.setAutoCommit(false); // Atomic Transaction

            try (PreparedStatement psTicket = conn.prepareStatement(ticketSql)) {
                psTicket.setString(1, pnr);
                psTicket.setInt(2, trainNo);
                psTicket.setDate(3, java.sql.Date.valueOf(date));
                psTicket.setString(4, travelClass);
                psTicket.setInt(5, passengers.length);
                psTicket.setDouble(6, totalFare);
                psTicket.setString(7, phone);
                psTicket.setString(8, email);
                psTicket.executeUpdate();
            }

            try (PreparedStatement psPassenger = conn.prepareStatement(passengerSql)) {
                for (Passenger p : passengers) {
                    psPassenger.setString(1, pnr);
                    psPassenger.setString(2, p.getName());
                    psPassenger.setInt(3, p.getAge());
                    psPassenger.setString(4, p.getGender());
                    psPassenger.setString(5, p.getBerthPreference());
                    psPassenger.setString(6, p.getAllocatedCoach());
                    psPassenger.setInt(7, p.getAllocatedSeat());
                    psPassenger.setString(8, p.getAllocatedBerthType());
                    psPassenger.addBatch();
                }
                psPassenger.executeBatch();
            }

            conn.commit();
            return true;
        } catch (SQLException e) {
            if (conn != null) {
                try { conn.rollback(); } catch (SQLException ex) { ex.printStackTrace(); }
            }
            System.err.println("Transaction rolled back: " + e.getMessage());
            return false;
        } finally {
            if (conn != null) {
                try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
        }
    }

    /**
     * Query PNR Status using PreparedStatement (Unit 4 core requirement)
     */
    public String getPNRStatusDetails(String pnr) {
        String ticketSql = "SELECT t.*, tr.train_name, tr.source_station, tr.dest_station " +
                           "FROM tickets t JOIN trains tr ON t.train_no = tr.train_no " +
                           "WHERE t.pnr = ?";
        String passengerSql = "SELECT * FROM passengers WHERE pnr = ?";

        StringBuilder sb = new StringBuilder();
        try (Connection conn = getConnection();
             PreparedStatement ps1 = conn.prepareStatement(ticketSql)) {

            ps1.setString(1, pnr);
            try (ResultSet rs = ps1.executeQuery()) {
                if (rs.next()) {
                    sb.append("================ PNR ENQUIRY ================\n");
                    sb.append("PNR: ").append(pnr).append("\n");
                    sb.append("Train: ").append(rs.getInt("train_no")).append(" - ").append(rs.getString("train_name")).append("\n");
                    sb.append("From: ").append(rs.getString("source_station")).append(" -> To: ").append(rs.getString("dest_station")).append("\n");
                    sb.append("Date of Journey: ").append(rs.getDate("journey_date")).append("\n");
                    sb.append("Class: ").append(rs.getString("travel_class")).append(" | Status: ").append(rs.getString("booking_status")).append("\n");
                    sb.append("Total Fare: ₹").append(rs.getDouble("total_fare")).append("\n");
                    sb.append("---------------- PASSENGERS -----------------\n");

                    try (PreparedStatement ps2 = conn.prepareStatement(passengerSql)) {
                        ps2.setString(1, pnr);
                        try (ResultSet rs2 = ps2.executeQuery()) {
                            int count = 1;
                            while (rs2.next()) {
                                sb.append(count++).append(". ")
                                  .append(rs2.getString("name")).append(" (")
                                  .append(rs2.getInt("age")).append("/").append(rs2.getString("gender")).append(") -> ")
                                  .append("Coach: ").append(rs2.getString("allocated_coach"))
                                  .append(", Seat: ").append(rs2.getInt("allocated_seat"))
                                  .append(" (").append(rs2.getString("allocated_berth_type")).append(") [")
                                  .append(rs2.getString("status")).append("]\n");
                            }
                        }
                    }
                    sb.append("=============================================\n");
                    return sb.toString();
                } else {
                    return "PNR " + pnr + " not found!";
                }
            }
        } catch (SQLException e) {
            return "Database connection error: " + e.getMessage();
        }
    }

    /**
     * Cancel Ticket & record refund with PreparedStatement
     */
    public boolean cancelTicket(String pnr, double refundAmount) {
        String updateTicket = "UPDATE tickets SET booking_status = 'CANCELLED', refund_amount = ? WHERE pnr = ?";
        String updatePassengers = "UPDATE passengers SET status = 'CANCELLED' WHERE pnr = ?";

        try (Connection conn = getConnection()) {
            conn.setAutoCommit(false);
            try (PreparedStatement ps1 = conn.prepareStatement(updateTicket);
                 PreparedStatement ps2 = conn.prepareStatement(updatePassengers)) {
                
                ps1.setDouble(1, refundAmount);
                ps1.setString(2, pnr);
                ps1.executeUpdate();

                ps2.setString(1, pnr);
                ps2.executeUpdate();

                conn.commit();
                return true;
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            }
        } catch (SQLException e) {
            System.err.println("Error cancelling ticket: " + e.getMessage());
            return false;
        }
    }
}
