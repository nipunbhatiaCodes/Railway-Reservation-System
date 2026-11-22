package railway.booking;

import java.util.HashMap;
import java.util.Map;
import railway.exception.SeatNotAvailableException;
import railway.model.Passenger;

/**
 * CSE2003 - Unit 3: Synchronized Seat Allocation Across Multiple Threads
 * Prevents race conditions during concurrent bookings.
 * Group 7: Railway Ticket Reservation System
 */
public class SynchronizedSeatAllocator {
    // Shared thread-safe seat inventory per train and class
    private static final Map<String, Integer> inventory = new HashMap<>();
    private static final Object lock = new Object();

    static {
        // Initialize sample inventories: trainNo_class -> seat count
        inventory.put("22436_3A", 42);
        inventory.put("22436_1A", 18);
        inventory.put("12952_2A", 24);
        inventory.put("12952_3A", 50);
        inventory.put("12626_SL", 72);
    }

    /**
     * Synchronized method to safely reserve seats across concurrent threads.
     * Throws SeatNotAvailableException if requested > available.
     */
    public static synchronized void allocateBerths(int trainNo, String travelClass, Passenger[] passengers) 
            throws SeatNotAvailableException {
        
        String key = trainNo + "_" + travelClass;
        int currentAvailable = inventory.getOrDefault(key, 30);
        int requested = passengers.length;

        if (currentAvailable < requested) {
            throw new SeatNotAvailableException(travelClass, requested, currentAvailable);
        }

        // Deduct seats safely
        inventory.put(key, currentAvailable - requested);

        // Smart berth allocation algorithm:
        // Prioritize Lower Berth (LB) for Senior Citizens
        int startingSeat = 72 - currentAvailable + 1;
        String coachPrefix = travelClass.equals("1A") ? "H1" : 
                            (travelClass.equals("2A") ? "A1" : 
                            (travelClass.equals("3A") ? "B1" : "S1"));

        for (int i = 0; i < passengers.length; i++) {
            Passenger p = passengers[i];
            int seatNum = startingSeat + i;
            String berthType = determineBerthType(seatNum, p.isSeniorCitizen(), p.getBerthPreference());
            p.setAllocation(coachPrefix, seatNum, berthType);
        }
    }

    /**
     * Synchronized release of seats upon ticket cancellation.
     */
    public static synchronized void releaseSeats(int trainNo, String travelClass, int seatCount) {
        String key = trainNo + "_" + travelClass;
        int current = inventory.getOrDefault(key, 0);
        inventory.put(key, current + seatCount);
    }

    private static String determineBerthType(int seatNum, boolean isSenior, String preference) {
        if (isSenior) {
            return "LB"; // Prioritize lower berth for senior citizens
        }
        
        int mod = seatNum % 8;
        switch (mod) {
            case 1:
            case 4:
                return "LB"; // Lower Berth
            case 2:
            case 5:
                return "MB"; // Middle Berth
            case 3:
            case 6:
                return "UB"; // Upper Berth
            case 7:
                return "SL"; // Side Lower
            case 0:
            default:
                return "SU"; // Side Upper
        }
    }

    public static synchronized int getAvailable(int trainNo, String travelClass) {
        return inventory.getOrDefault(trainNo + "_" + travelClass, 25);
    }
}
