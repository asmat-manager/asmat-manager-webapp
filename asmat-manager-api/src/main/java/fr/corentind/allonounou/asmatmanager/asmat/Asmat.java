package fr.corentind.allonounou.asmatmanager.asmat;

import lombok.Data;

import javax.persistence.*;

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
}