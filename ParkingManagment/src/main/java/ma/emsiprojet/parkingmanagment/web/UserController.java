package ma.emsiprojet.parkingmanagment.web;

import ma.emsiprojet.parkingmanagment.entities.User;
import ma.emsiprojet.parkingmanagment.entities.UserAccount;
import ma.emsiprojet.parkingmanagment.repositories.UserAccountRepository;
import ma.emsiprojet.parkingmanagment.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/plus")
    public ResponseEntity<List<Object[]>> getAllUsersPlus() {
        List<Object[]> usersPlus = userRepository.findAllUsersPlus();
        return ResponseEntity.ok(usersPlus);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Object[]>> getUserByEmail(@RequestParam("email") String email) {
        List<Object[]> users = userRepository.getUserByEmail(email);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<String> deleteUserByEmail(@PathVariable String email) {
        userRepository.deleteByEmail(email);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PostMapping("/signup")
    public ResponseEntity<String> userSignup(@RequestBody Map<String, String> userinfo) {

        if (userAccountRepository.findByPhone(userinfo.get("phone"))) {
            return ResponseEntity.badRequest().body("Phone number already exists");
        } else if(userAccountRepository.findByEmail(userinfo.get("email"))){
            return ResponseEntity.badRequest().body("Email already exists");
        }else {
            User user = new User();
            user.setFirstName(userinfo.get("firstName"));
            user.setLastName(userinfo.get("lastName"));
            user.setPhone(userinfo.get("phone"));
            userRepository.save(user);

            UserAccount userAccount = new UserAccount();
            userAccount.setEmail(userinfo.get("email"));
            userAccount.setPassword(userinfo.get("password"));
            userAccount.setReservationNumber(0);
            userAccount.setIdUser(user);
            userAccountRepository.save(userAccount);

            return ResponseEntity.ok("User signed up successfully");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Long> userLogin(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        boolean userStatus = userAccountRepository.findByEmailAndPassword(email, password);
        if (userStatus) {
            Long userId = userRepository.findIdUserByEmail(email);
            return ResponseEntity.ok(userId);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @GetMapping("/profile/{userid}")
    public Object userProfile(@PathVariable Long userid) {
        Object fulluser = userRepository.fullUserById(userid);
        return fulluser;
    }

    @PutMapping("/profile/edit/{userid}")
    public ResponseEntity<String> updateUserProfile(@PathVariable Long userid, @RequestBody Map<String, String> userData) {
        String firstName = userData.get("firstName");
        String lastName = userData.get("lastName");
        String phone = userData.get("phone");
        String email = userData.get("email");
        String password = userData.get("password");
        if (userAccountRepository.findByPhoneForUpdate(phone, userid)) {
            return ResponseEntity.badRequest().body("phone");
        } else if (userAccountRepository.findByEmailForUpdate(email, userid)) {
            return ResponseEntity.badRequest().body("email");
        }

        userRepository.updateUserAccount(email, password, userid);
        userRepository.updateUser(firstName, lastName, phone, userid);
        return ResponseEntity.ok("User updated successfully");
    }

}

