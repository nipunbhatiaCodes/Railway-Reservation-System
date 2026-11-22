package railway.booking;

import java.util.Date;
import railway.exception.SeatNotAvailableException;
import railway.model.Passenger;
import railway.model.Train;

/**
 * CSE2003 - Unit 1 & Unit 2: Abstract Base Ticket implementing Reservable
 * Class hierarchy by class type; method overriding; package railway.booking
 */
public abstract class Ticket implements Reservable {
    protected String pnr;
    protected Train train;
    protected Passenger[] passengers; // Array of passengers (Unit 1)
    protected String journeyDate;
    protected String travelClass;
    protected String bookingStatus; // "CONFIRMED", "CANCELLED"
    protected double totalFare;
    protected double refundAmount;

    public Ticket(String pnr, Train train, Passenger[] passengers, String journeyDate, String travelClass) {
        this.pnr = pnr;
        this.train = train;
        this.passengers = passengers;
        this.journeyDate = journeyDate;
        this.travelClass = travelClass;
        this.bookingStatus = "CONFIRMED";
        this.refundAmount = 0.0;
    }

    // Method Overriding targets
    @Override
    public abstract double calculateFare();

    @Override
    public abstract double calculateRefund(long hoursBeforeDeparture);

    @Override
    public void cancelReservation() {
        this.bookingStatus = "CANCELLED";
        if (passengers != null) {
            for (Passenger p : passengers) {
                p.setStatus("CANCELLED");
            }
        }
    }

    // Getters and Setters
    public String getPnr() { return pnr; }
    public Train getTrain() { return train; }
    public Passenger[] getPassengers() { return passengers; }
    public String getJourneyDate() { return journeyDate; }
    public String getTravelClass() { return travelClass; }
    public String getBookingStatus() { return bookingStatus; }
    public double getTotalFare() { return totalFare; }
    public double getRefundAmount() { return refundAmount; }
    public void setRefundAmount(double refundAmount) { this.refundAmount = refundAmount; }
}
