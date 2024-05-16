package ma.emsiprojet.parkingmanagment.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
public class mainController {

    @GetMapping("/api/main")
    public String mainPage(){
        return "Welcome to the main page";
    }
}
