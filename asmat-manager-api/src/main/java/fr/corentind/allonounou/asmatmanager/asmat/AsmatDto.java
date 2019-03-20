package fr.corentind.allonounou.asmatmanager.asmat;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Data
class AsmatDto {

    private Long id;

    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;
    private String email;
    private LocalDate deadlineDate;
    private LocalDate remindDate;
    private Integer receptions;

    @NotNull
    private Boolean adherent;

    @Pattern(regexp = "^((?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4})?$")
    private String phoneNumber;

    @NotNull
    private AddressDto address;

    public AsmatDto() {
        address = new AddressDto();
    }
}
