package railway.model;

/**
 * CSE2003 - Unit 1: Passenger Class
 * Group 7: Railway Ticket Reservation System
 */
public class Passenger {
    private String name;
    private int age;
    private String gender; // "Male", "Female", "Other"
    private String berthPreference; // "Lower", "Middle", "Upper", "Side Lower", "Side Upper"
    private String allocatedCoach;
    private int allocatedSeat;
    private String allocatedBerthType;
    private String status; // "CONFIRMED", "CANCELLED", "RAC", "WL"

    // Overloaded Constructor 1
    public Passenger(String name, int age, String gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.berthPreference = "No Preference";
        this.status = "PENDING";
    }

    // Overloaded Constructor 2 (Method Overloading)
    public Passenger(String name, int age, String gender, String berthPreference) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.berthPreference = berthPreference;
        this.status = "PENDING";
    }

    public boolean isSeniorCitizen() {
        return this.age >= 60;
    }

    // Getters and Setters
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getGender() { return gender; }
    public String getBerthPreference() { return berthPreference; }
    public String getAllocatedCoach() { return allocatedCoach; }
    public int getAllocatedSeat() { return allocatedSeat; }
    public String getAllocatedBerthType() { return allocatedBerthType; }
    public String getStatus() { return status; }

    public void setAllocation(String coach, int seat, String berthType) {
        this.allocatedCoach = coach;
        this.allocatedSeat = seat;
        this.allocatedBerthType = berthType;
        this.status = "CONFIRMED";
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return name + " (" + age + ", " + gender + ") -> " + 
               (status.equals("CONFIRMED") ? (allocatedCoach + "-" + allocatedSeat + "/" + allocatedBerthType) : status);
    }
}
