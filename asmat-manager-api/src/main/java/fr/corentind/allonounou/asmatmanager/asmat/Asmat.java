package fr.corentind.allonounou.asmatmanager.asmat;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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

    @NotNull
    private Boolean adherent;

    @Embedded
    private Address address;
}
