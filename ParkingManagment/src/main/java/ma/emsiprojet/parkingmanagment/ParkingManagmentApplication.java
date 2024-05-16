package ma.emsiprojet.parkingmanagment;

import ma.emsiprojet.parkingmanagment.entities.Admin;
import ma.emsiprojet.parkingmanagment.entities.Person;
import ma.emsiprojet.parkingmanagment.entities.User;
import ma.emsiprojet.parkingmanagment.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
//@ComponentScan(basePackages = {"ma.emsiprojet.parkingmanagment.corsconf"})
public class ParkingManagmentApplication implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(ParkingManagmentApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("***********");
    }
}


