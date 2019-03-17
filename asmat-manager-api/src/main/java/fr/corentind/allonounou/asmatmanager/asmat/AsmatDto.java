package fr.corentind.allonounou.asmatmanager.asmat;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
class AsmatDto {

    private Long id;

    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;
    private String email;

    @NotNull
    private Boolean adherent;

    @Pattern(regexp = "^((?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4})?$")
    private String phoneNumber;

    @NotNull
    private AddressDto address;
}
