package fr.corentind.allonounou.asmatmanager;

import fr.corentind.allonounou.asmatmanager.user.AsmatManagerUser;
import fr.corentind.allonounou.asmatmanager.user.AsmatUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class AsmatManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(AsmatManagerApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(AsmatUserRepository repository,
                                               BCryptPasswordEncoder encoder) {
        return args -> {
            AsmatManagerUser user = new AsmatManagerUser();
            user.setUsername("cocoz");
            user.setPassword(encoder.encode("abcdef"));
            repository.save(user);
        };
    }

}
