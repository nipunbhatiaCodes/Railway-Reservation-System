package railway.booking;

import railway.exception.SeatNotAvailableException;
import railway.model.Passenger;
import railway.model.Train;

/**
 * CSE2003 - Unit 2: ACTicket subclass with Method Overriding
 * Handles 1A, 2A, 3A AC classes and IRCTC AC cancellation slabs.
 */
public class ACTicket extends Ticket {
    private String acTier; // "1A", "2A", "3A"
    private boolean cateringOpted;

    public ACTicket(String pnr, Train train, Passenger[] passengers, String journeyDate, String acTier, boolean cateringOpted) {
        super(pnr, train, passengers, journeyDate, acTier);
        this.acTier = acTier;
        this.cateringOpted = cateringOpted;
        this.totalFare = calculateFare();
    }

    // Method Overriding (Unit 2)
    @Override
    public double calculateFare() {
        double multiplier = 1.0;
        double reservationCharge = 40.0;
        double superfastCharge = 45.0;

        switch (acTier) {
            case "1A":
                multiplier = 3.2;
                reservationCharge = 60.0;
                break;
            case "2A":
                multiplier = 2.1;
                reservationCharge = 50.0;
                break;
            case "3A":
            default:
                multiplier = 1.5;
                reservationCharge = 40.0;
                break;
        }

        double perPersonBase = train.getBaseFare() * multiplier + reservationCharge + superfastCharge;
        if (cateringOpted) {
            perPersonBase += 350.0; // Catering meal
        }

        // Apply senior citizen discount if applicable
        double total = 0.0;
        for (Passenger p : passengers) {
            if (p.isSeniorCitizen()) {
                total += perPersonBase * 0.60; // 40% concession
            } else {
                total += perPersonBase;
            }
        }

        // 5% GST on AC travel
        total = total * 1.05;
        return Math.round(total * 100.0) / 100.0;
    }

    // Method Overriding (Unit 2) - IRCTC Official Refund Rules
    @Override
    public double calculateRefund(long hoursBeforeDeparture) {
        double cancellationFeePerPassenger = 0.0;

        if (hoursBeforeDeparture >= 48) {
            // Flat clerkage fee
            if ("1A".equals(acTier)) cancellationFeePerPassenger = 240.0;
            else if ("2A".equals(acTier)) cancellationFeePerPassenger = 200.0;
            else cancellationFeePerPassenger = 180.0; // 3A
            
            double totalDeduction = cancellationFeePerPassenger * passengers.length;
            this.refundAmount = Math.max(0, this.totalFare - totalDeduction);
        } else if (hoursBeforeDeparture >= 12) {
            // 25% subject to min flat fee
            double minFee = "1A".equals(acTier) ? 240.0 : ("2A".equals(acTier) ? 200.0 : 180.0);
            double deduction = Math.max(minFee * passengers.length, this.totalFare * 0.25);
            this.refundAmount = Math.max(0, this.totalFare - deduction);
        } else if (hoursBeforeDeparture >= 4) {
            // 50% deduction
            this.refundAmount = Math.max(0, this.totalFare * 0.50);
        } else {
            // Less than 4 hours: no refund
            this.refundAmount = 0.0;
        }

        return Math.round(this.refundAmount * 100.0) / 100.0;
    }

    @Override
    public void reserve(Passenger[] passengers) throws SeatNotAvailableException {
        // Will be invoked via SynchronizedSeatAllocator
        this.bookingStatus = "CONFIRMED";
    }

    public String getAcTier() { return acTier; }
}
