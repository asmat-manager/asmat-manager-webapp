package fr.corentind.allonounou.asmatmanager.asmat;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "asmat")
@Data
class Asmat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private Boolean adherent;
    private LocalDate joiningDate;
    private LocalDate remindDate;
    private Integer receptions;

    @Embedded
    private Address address;

    public Asmat() {
        this.address = new Address();
    }
}
