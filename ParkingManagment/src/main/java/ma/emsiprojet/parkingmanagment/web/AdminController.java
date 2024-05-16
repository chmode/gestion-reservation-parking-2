package ma.emsiprojet.parkingmanagment.web;

import ma.emsiprojet.parkingmanagment.repositories.AdminAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminAccountRepository adminAccountRepository;

    @GetMapping("/welcome")
    public ResponseEntity<String> welcomPage() {
        return ResponseEntity.ok("Welcome to admin page");
    }

    @PostMapping("/login")
    public ResponseEntity<String> adminLogin(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        boolean adminStatus = adminAccountRepository.findByEmailAndPassword(email, password);
        if (adminStatus) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password. Please try again.");
        }
    }

}
