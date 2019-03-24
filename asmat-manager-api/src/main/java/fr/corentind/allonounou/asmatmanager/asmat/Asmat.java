package fr.corentind.allonounou.asmatmanager.asmat;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "asmat", uniqueConstraints = @UniqueConstraint(columnNames = {"firstName", "lastName"}))
@Data
class Asmat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String cellPhoneNumber;
    private String fixPhoneNumber;
    private String email;
    private Boolean adherent;
    private LocalDate joiningDate;
    private LocalDate remindDate;
    private Integer receptions;

    @Embedded
    private Address address;

    private Boolean availabilityCommunicated;
    private Integer babyAvailability;
    private Integer scholarAvailability;

    public Asmat() {
        this.address = new Address();
    }
}
