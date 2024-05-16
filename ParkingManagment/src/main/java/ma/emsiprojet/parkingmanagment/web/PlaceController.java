package ma.emsiprojet.parkingmanagment.web;

import ma.emsiprojet.parkingmanagment.entities.Place;
import ma.emsiprojet.parkingmanagment.repositories.ParkingRepository;
import ma.emsiprojet.parkingmanagment.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private ParkingRepository parkingRepository;

    @GetMapping("placebyid/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable Long id) {
        Optional<Place> placeOptional = placeRepository.findById(id);
        return placeOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/places/{parkingId}")
    public ResponseEntity<List<Place>> getPlacesByParking(@PathVariable Long parkingId) {
        List<Place> places = placeRepository.findAllplaces(parkingId);
        return ResponseEntity.ok(places);
    }



    @DeleteMapping("/{parkingId}/places/{placeId}")
    public ResponseEntity<Void> deletePlace(@PathVariable Long parkingId, @PathVariable Long placeId) {
        Long parkingIdOfPlace = placeRepository.findParkingIdByPlaceId(placeId);
        if (parkingIdOfPlace == null || !parkingIdOfPlace.equals(parkingId)) {
            return ResponseEntity.notFound().build();
        }

        placeRepository.deleteById(placeId);
        return ResponseEntity.ok().build();
    }

    /*@PutMapping("update/{id}")
    public ResponseEntity<Void> updatePlace(@PathVariable Long id, @RequestBody Place updatedPlace) {
        Long parkingId = placeRepository.findParkingByPlaceId(id);
        boolean placeExists = placeRepository.existsByNameAndParkingIdAndNotCurrentPlaceId(updatedPlace.getName(),id);
        if (placeExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            placeRepository.updatePlace(id, updatedPlace.getName(), updatedPlace.getPrice(), updatedPlace.getState());
            return ResponseEntity.ok().build();
        }
    }*/
    @PutMapping("update/{id}")
    public ResponseEntity<Void> updatePlace(@PathVariable Long id, @RequestBody Place updatedPlace) {
        Long parkingId = placeRepository.findParkingByPlaceId(id);

        // Fetch the existing place from the database
        Place existingPlace = placeRepository.findById(id).orElse(null);
        if (existingPlace == null) {
            return ResponseEntity.notFound().build();
        }

        // Check if the name has changed and if a place with the same name exists in the same parking
        if (!existingPlace.getName().equals(updatedPlace.getName()) &&
                placeRepository.existsByNameAndParkingId(updatedPlace.getName(), parkingId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // Update the place with the new data
        existingPlace.setName(updatedPlace.getName());
        existingPlace.setPrice(updatedPlace.getPrice());
        existingPlace.setState(updatedPlace.getState());
        placeRepository.save(existingPlace);

        return ResponseEntity.ok().build();
    }


    @PostMapping("placeadd")
    public ResponseEntity<Void> addPlace(@RequestBody Place newPlace) {
        boolean placeExists = placeRepository.existsByNameAndParkingId(newPlace.getName(), newPlace.getParking().getIdParking());
        if (placeExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            placeRepository.save(newPlace);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
    }
}
