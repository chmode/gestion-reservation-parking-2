package ma.emsiprojet.parkingmanagment.web;

import ma.emsiprojet.parkingmanagment.entities.Parking;
import ma.emsiprojet.parkingmanagment.repositories.ParkingRepository;
import ma.emsiprojet.parkingmanagment.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/parkings")
public class ParkingController {

    @Autowired
    private ParkingRepository parkingRepo;

    @Autowired
    private PlaceRepository placeRepo;

    @GetMapping("/all")
    public List<Parking> getAllParking(@RequestParam(name = "idparking", required = false) Long selectedParkingId) {
        List<Parking> allParking = parkingRepo.findAllParking();
        return allParking;
    }
}
