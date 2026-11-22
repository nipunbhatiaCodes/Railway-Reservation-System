package railway.model;

import java.util.Arrays;

/**
 * CSE2003 - Unit 1: Class Train with array of coaches/seats, method overloading.
 * Group 7: Railway Ticket Reservation System
 */
public class Train {
    private int trainNo;
    private String trainName;
    private String source;
    private String destination;
    private String departureTime;
    private String arrivalTime;
    private double baseFare;
    private int[] availableSeats; // Array: [1A, 2A, 3A, SL]

    // Default Constructor
    public Train() {
        this.availableSeats = new int[]{10, 20, 40, 72};
    }

    // Overloaded Constructor 1
    public Train(int trainNo, String trainName, String source, String destination, double baseFare) {
        this();
        this.trainNo = trainNo;
        this.trainName = trainName;
        this.source = source;
        this.destination = destination;
        this.baseFare = baseFare;
    }

    // Overloaded Constructor 2 (Method Overloading)
    public Train(int trainNo, String trainName, String source, String destination, 
                 String departureTime, String arrivalTime, double baseFare, int[] availableSeats) {
        this.trainNo = trainNo;
        this.trainName = trainName;
        this.source = source;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.baseFare = baseFare;
        this.availableSeats = Arrays.copyOf(availableSeats, availableSeats.length);
    }

    // Overloaded search/match methods (Method Overloading)
    public boolean matches(String query) {
        return trainName.toLowerCase().contains(query.toLowerCase()) || 
               String.valueOf(trainNo).contains(query);
    }

    public boolean matches(String from, String to) {
        return this.source.equalsIgnoreCase(from) && this.destination.equalsIgnoreCase(to);
    }

    // Getters and Setters
    public int getTrainNo() { return trainNo; }
    public String getTrainName() { return trainName; }
    public String getSource() { return source; }
    public String getDestination() { return destination; }
    public String getDepartureTime() { return departureTime; }
    public String getArrivalTime() { return arrivalTime; }
    public double getBaseFare() { return baseFare; }
    public int[] getAvailableSeats() { return availableSeats; }

    public void setAvailableSeats(int classIndex, int count) {
        if (classIndex >= 0 && classIndex < availableSeats.length) {
            this.availableSeats[classIndex] = count;
        }
    }

    @Override
    public String toString() {
        return trainNo + " - " + trainName + " (" + source + " -> " + destination + ")";
    }
}
