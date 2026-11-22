package railway.booking;

import railway.exception.SeatNotAvailableException;
import railway.model.Passenger;
import railway.model.Train;

/**
 * CSE2003 - Unit 2: SleeperTicket subclass with Method Overriding
 * Handles Sleeper class tickets and standard non-AC refund policies.
 */
public class SleeperTicket extends Ticket {
    private boolean beddingRequired;

    public SleeperTicket(String pnr, Train train, Passenger[] passengers, String journeyDate, boolean beddingRequired) {
        super(pnr, train, passengers, journeyDate, "SL");
        this.beddingRequired = beddingRequired;
        this.totalFare = calculateFare();
    }

    // Method Overriding (Unit 2)
    @Override
    public double calculateFare() {
        double reservationCharge = 20.0;
        double superfastCharge = 30.0;
        double perPersonBase = train.getBaseFare() + reservationCharge + superfastCharge;

        if (beddingRequired) {
            perPersonBase += 50.0;
        }

        double total = 0.0;
        for (Passenger p : passengers) {
            if (p.isSeniorCitizen()) {
                total += perPersonBase * 0.60; // 40% senior citizen concession
            } else {
                total += perPersonBase;
            }
        }
        return Math.round(total * 100.0) / 100.0;
    }

    // Method Overriding (Unit 2)
    @Override
    public double calculateRefund(long hoursBeforeDeparture) {
        double cancellationFeePerPassenger = 120.0; // IRCTC Sleeper flat charge > 48h

        if (hoursBeforeDeparture >= 48) {
            double totalDeduction = cancellationFeePerPassenger * passengers.length;
            this.refundAmount = Math.max(0, this.totalFare - totalDeduction);
        } else if (hoursBeforeDeparture >= 12) {
            double deduction = Math.max(cancellationFeePerPassenger * passengers.length, this.totalFare * 0.25);
            this.refundAmount = Math.max(0, this.totalFare - deduction);
        } else if (hoursBeforeDeparture >= 4) {
            this.refundAmount = Math.max(0, this.totalFare * 0.50);
        } else {
            this.refundAmount = 0.0;
        }

        return Math.round(this.refundAmount * 100.0) / 100.0;
    }

    @Override
    public void reserve(Passenger[] passengers) throws SeatNotAvailableException {
        this.bookingStatus = "CONFIRMED";
    }

    public boolean isBeddingRequired() { return beddingRequired; }
}
