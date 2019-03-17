package fr.corentind.allonounou.asmatmanager.asmat;

import lombok.Data;

import javax.persistence.Embeddable;

@Embeddable
@Data
public class Address {

    private String streetNo;
    private String street;
    private String postalCode;
    private String city;

}
