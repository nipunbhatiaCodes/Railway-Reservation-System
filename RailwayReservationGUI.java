package railway.gui;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import railway.dao.BookingDAO;

/**
 * CSE2003 - Unit 5: Swing form using BorderLayout and FlowLayout; JButton events and adapter class
 * Group 7: Railway Ticket Reservation System
 */
public class RailwayReservationGUI extends JFrame {
    private JTextField pnrField;
    private JTextArea displayArea;
    private JButton checkPnrButton;
    private JButton clearButton;
    private JButton exitButton;
    private BookingDAO bookingDAO;

    public RailwayReservationGUI() {
        super("Indian Railways Reservation System - Group 7 Mini Project");
        bookingDAO = new BookingDAO();
        initComponents();
    }

    private void initComponents() {
        // Frame properties
        setSize(700, 500);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Layout: BorderLayout (Unit 5 requirement)
        setLayout(new BorderLayout(10, 10));

        // North Panel: Title Banner
        JPanel northPanel = new JPanel();
        northPanel.setBackground(new Color(24, 43, 73));
        northPanel.setLayout(new FlowLayout(FlowLayout.CENTER, 15, 12));
        JLabel titleLabel = new JLabel("IRCTC - Railway Ticket Reservation & PNR Enquiry");
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 18));
        titleLabel.setForeground(Color.WHITE);
        northPanel.add(titleLabel);
        add(northPanel, BorderLayout.NORTH);

        // Center Panel: PNR Input and Output Area
        JPanel centerPanel = new JPanel();
        centerPanel.setLayout(new BorderLayout(8, 8));
        centerPanel.setBorder(BorderFactory.createEmptyBorder(10, 15, 10, 15));

        // Top of Center: Input FlowLayout (Unit 5 requirement)
        JPanel inputPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 10, 5));
        JLabel pnrLabel = new JLabel("Enter 10-Digit PNR:");
        pnrLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        pnrField = new JTextField(15);
        pnrField.setFont(new Font("Consolas", Font.BOLD, 14));
        checkPnrButton = new JButton("Search PNR Status");
        checkPnrButton.setBackground(new Color(230, 81, 0));
        checkPnrButton.setForeground(Color.WHITE);
        checkPnrButton.setFocusPainted(false);

        inputPanel.add(pnrLabel);
        inputPanel.add(pnrField);
        inputPanel.add(checkPnrButton);
        centerPanel.add(inputPanel, BorderLayout.NORTH);

        // Center display text area with JScrollPane
        displayArea = new JTextArea();
        displayArea.setFont(new Font("Monospaced", Font.PLAIN, 13));
        displayArea.setEditable(false);
        displayArea.setBackground(new Color(248, 249, 250));
        displayArea.setText("Welcome to Railway Ticket Reservation System (Group 7)\n"
                         + "Team: Akshay Bhardwaj (Leader), Utkarsh Mishra, Nipun Bhatia, Shreyansh\n"
                         + "Enter a valid PNR (e.g. 2849182746) and click 'Search PNR Status'.\n");
        centerPanel.add(new JScrollPane(displayArea), BorderLayout.CENTER);
        add(centerPanel, BorderLayout.CENTER);

        // South Panel: FlowLayout for action buttons (Unit 5 requirement)
        JPanel southPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 15, 10));
        clearButton = new JButton("Clear Screen");
        exitButton = new JButton("Exit Application");

        southPanel.add(clearButton);
        southPanel.add(exitButton);
        add(southPanel, BorderLayout.SOUTH);

        // Event Handling: JButton ActionListeners & KeyAdapter (Unit 5 requirement)
        checkPnrButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                handlePNRCheck();
            }
        });

        clearButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                pnrField.setText("");
                displayArea.setText("Display cleared. Ready for next query.");
            }
        });

        // Using WindowAdapter (Adapter class requirement from Unit 5)
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.out.println("Closing Railway Reservation GUI. Thank you!");
                System.exit(0);
            }
        });

        // KeyAdapter on PNR text field to allow pressing ENTER to submit
        pnrField.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_ENTER) {
                    handlePNRCheck();
                }
            }
        });

        exitButton.addActionListener(e -> System.exit(0));
    }

    private void handlePNRCheck() {
        String pnr = pnrField.getText().trim();
        if (pnr.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please enter a valid PNR number!", "Input Error", JOptionPane.WARNING_MESSAGE);
            return;
        }

        displayArea.setText("Fetching PNR details for " + pnr + "...\n\n");
        // Simulated mock or DB query
        if ("2849182746".equals(pnr)) {
            displayArea.setText(
                "==========================================================\n" +
                "                 INDIAN RAILWAYS E-TICKET\n" +
                "==========================================================\n" +
                "PNR: " + pnr + "            Booking Status: CONFIRMED\n" +
                "Train: 22436 - Vande Bharat Express\n" +
                "Route: New Delhi (NDLS) -> Varanasi Jn (BSB)\n" +
                "Date:  15-Dec-2026           Class: 3A (AC 3 Tier)\n" +
                "----------------------------------------------------------\n" +
                "PASSENGER DETAILS:\n" +
                " 1. Akshay Bhardwaj  (21/M) -> Coach: C1, Seat: 12 (LB) [CNF]\n" +
                " 2. Utkarsh Mishra   (20/M) -> Coach: C1, Seat: 13 (MB) [CNF]\n" +
                "----------------------------------------------------------\n" +
                "Total Fare: ₹2,840.00 | Payment: Online NetBanking\n" +
                "==========================================================\n"
            );
        } else {
            String result = bookingDAO.getPNRStatusDetails(pnr);
            displayArea.setText(result);
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new RailwayReservationGUI().setVisible(true);
        });
    }
}
