package fr.corentind.allonounou.asmatmanager.asmat;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

@Data
public class AsmatDto {

    private Long id;

    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;
    private String email;
    private LocalDate joiningDate;
    private LocalDate remindDate;
    private Integer receptions;

    @NotNull
    private Boolean adherent;

    @Pattern(regexp = "^((?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4})?$")
    private String cellPhoneNumber;

    @Pattern(regexp = "^((?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4})?$")
    private String fixPhoneNumber;

    @NotNull
    private AddressDto address;

    @NotNull
    private Boolean availabilityCommunicated;

    @PositiveOrZero
    private Integer babyAvailability;

    @PositiveOrZero
    private Integer scholarAvailability;

    public AsmatDto() {
        address = new AddressDto();
    }
}
