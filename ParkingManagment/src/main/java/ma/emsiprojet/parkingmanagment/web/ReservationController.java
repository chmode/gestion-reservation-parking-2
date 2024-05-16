package ma.emsiprojet.parkingmanagment.web;

import ma.emsiprojet.parkingmanagment.entities.*;
import ma.emsiprojet.parkingmanagment.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ParkingRepository parkingRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/history/{userid}")
    public ResponseEntity<List<ReservationDetailsHelper>> showReservationDetails(@PathVariable Long userid) {
        List<ReservationDetailsHelper> reservations = new ArrayList<>();
        List<Object[]> reservationObjects = reservationRepository.findReservationDetailsWithInvoice(userid);
        for (Object[] res : reservationObjects) {
            LocalDateTime arrivalDateTime = (LocalDateTime) res[0];
            LocalDateTime departureDateTime = (LocalDateTime) res[1];
            Duration duration = Duration.between(arrivalDateTime, departureDateTime);
            int hours = (int)duration.toHours();
            int minutes = duration.toMinutesPart();
            ReservationDetailsHelper reservationDetails = new ReservationDetailsHelper(res, hours, minutes);
            reservations.add(reservationDetails);
        }
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/user/resarvation/f/{userid}")
    public ResponseEntity<String> displayReservationFirstTime(@PathVariable Long userid) {
        List<Parking> parkingOptions = parkingRepository.findAll();
        return ResponseEntity.ok("ok");
    }

    /*@GetMapping("/user/reservation/s/{userid}")
    public ResponseEntity<String> makeReservationPage(@PathVariable Long userid) {
        List<Parking> parkingOptions = parkingRepository.findAll();
        // Consider returning the parking options as JSON
        return ResponseEntity.ok("Implement returning parking options as JSON");
    }*/

    @PostMapping("/user/reservation/s")
    public List<Place> makeReservation(@RequestBody Map<String, String> reservationIntro){
        LocalDateTime dateIn = LocalDateTime.parse(reservationIntro.get("dateIn"));
        LocalDateTime dateOut = LocalDateTime.parse(reservationIntro.get("dateOut"));
        Long parkingid = Long.parseLong(reservationIntro.get("parkingId"));
        List<Place> availablePlaces = reservationRepository.findAvailablePlaces(parkingid, dateIn, dateOut);
        return availablePlaces;
    }




    @PostMapping("/user/reservation/validation")
    public ResponseEntity<Map<String,String>> reservationValidation(@RequestBody Map<String, String> reservationIntro) {

        LocalDateTime dateIn = LocalDateTime.parse(reservationIntro.get("dateIn"));
        LocalDateTime dateOut = LocalDateTime.parse(reservationIntro.get("dateOut"));
        Long parkingid = Long.parseLong(reservationIntro.get("parkingId"));
        Long userid = Long.parseLong(reservationIntro.get("userId"));
        Long placeid = Long.parseLong(reservationIntro.get("placeId"));
        Float placeprice = Float.parseFloat(reservationIntro.get("price"));


        Parking parking = new Parking();
        parking.setIdParking(parkingid);

        User user = new User();
        user.setIdUser(userid);


        Place place = new Place();
        place.setIdPlace(placeid);

        Duration duration = Duration.between(dateIn, dateOut);
        int hours = (int) duration.toHours();
        int nbrminute = (int)duration.minusHours(hours).toMinutes();

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setParking(parking);
        reservation.setPlace(place);
        reservation.setDateIn(dateIn);
        reservation.setDateOut(dateOut);
        reservation.setHourNumber(hours);

        reservationRepository.save(reservation);


        reservationRepository.userReservationIncrement(userid);

        float totalPriceForHours = hours * placeprice;
        float pricePerMinute = (placeprice / 60);
        float totalPriceForMinutes = nbrminute * pricePerMinute;
        BigDecimal totalPriceBigDecimal = new BigDecimal(Float.toString(totalPriceForHours + totalPriceForMinutes));
        totalPriceBigDecimal = totalPriceBigDecimal.setScale(2, BigDecimal.ROUND_HALF_UP);
        float totalPrice = totalPriceBigDecimal.floatValue();

        Invoice invoice = new Invoice();
        invoice.setReservation(reservation);
        invoice.setTotalAmount(totalPrice);

        invoiceRepository.save(invoice);


        Map<String, String> invoiceDetails = new HashMap<>();
        invoiceDetails.put("dateIn", dateIn.toString());
        invoiceDetails.put("dateOut", dateOut.toString());
        invoiceDetails.put("parkingType",parkingRepository.findById(parkingid).get().getType() );
        invoiceDetails.put("placeName", placeRepository.findById(placeid).get().getName());
        invoiceDetails.put("totalAmount", String.valueOf(totalPrice));
        invoiceDetails.put("durationH", String.valueOf(hours));
        invoiceDetails.put("durationM", String.valueOf(nbrminute));
        invoiceDetails.put("userFname", userRepository.fullUserById(userid).getIdUser().getFirstName());
        invoiceDetails.put("userLname", userRepository.fullUserById(userid).getIdUser().getLastName());
        invoiceDetails.put("userPhone", userRepository.fullUserById(userid).getIdUser().getPhone());
        return ResponseEntity.ok(invoiceDetails);
    }

}



