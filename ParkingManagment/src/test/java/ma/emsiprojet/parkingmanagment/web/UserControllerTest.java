package ma.emsiprojet.parkingmanagment.web;

import ma.emsiprojet.parkingmanagment.repositories.UserAccountRepository;
import ma.emsiprojet.parkingmanagment.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class UserControllerTest {

    @Autowired
    private UserController userController;

    @MockBean
    private UserAccountRepository userAccountRepository;

    @MockBean
    private UserRepository userRepository;

    @Test
    public void testUserLogin() {
        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("email", "john@test");
        loginRequest.put("password", "password");
        when(userAccountRepository.findByEmailAndPassword("john@test", "password")).thenReturn(false);

        ResponseEntity<Long> responseEntity = userController.userLogin(loginRequest);
        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
        assertEquals(null, responseEntity.getBody());
    }

    @Test
    public void testGetAllUsersPlus() {
        List<Object[]> usersPlus = new ArrayList<>();
        usersPlus.add(new Object[]{"jhon", "worck"});
        usersPlus.add(new Object[]{"test", "worck"});

        when(userRepository.findAllUsersPlus()).thenReturn(usersPlus);

        ResponseEntity<List<Object[]>> responseEntity = userController.getAllUsersPlus();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(usersPlus, responseEntity.getBody());
    }

    @Test
    public void testGetUserByEmail() {
        List<Object[]> usersByEmail = new ArrayList<>();
        usersByEmail.add(new Object[]{"jhon", "jack"});

        when(userRepository.getUserByEmail("john@worck")).thenReturn(usersByEmail);
        ResponseEntity<List<Object[]>> responseEntity = userController.getUserByEmail("john@worck");
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(usersByEmail, responseEntity.getBody());
    }
}
