package railway.exception;

/**
 * CSE2003 - Unit 3: Custom Exception for Seat Availability
 * Group 7: Railway Ticket Reservation System
 */
public class SeatNotAvailableException extends Exception {
    private String travelClass;
    private int requestedSeats;
    private int availableSeats;

    public SeatNotAvailableException(String message) {
        super(message);
    }

    public SeatNotAvailableException(String travelClass, int requestedSeats, int availableSeats) {
        super("Insufficient seats in class " + travelClass + "! Requested: " + requestedSeats + ", Available: " + availableSeats);
        this.travelClass = travelClass;
        this.requestedSeats = requestedSeats;
        this.availableSeats = availableSeats;
    }

    public String getTravelClass() { return travelClass; }
    public int getRequestedSeats() { return requestedSeats; }
    public int getAvailableSeats() { return availableSeats; }
}
