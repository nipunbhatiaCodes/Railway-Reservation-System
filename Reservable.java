package railway.booking;

import railway.exception.SeatNotAvailableException;
import railway.model.Passenger;

/**
 * CSE2003 - Unit 2: Interface Reservable
 * Group 7: Railway Ticket Reservation System
 */
public interface Reservable {
    void reserve(Passenger[] passengers) throws SeatNotAvailableException;
    double calculateFare();
    double calculateRefund(long hoursBeforeDeparture);
    void cancelReservation();
}
