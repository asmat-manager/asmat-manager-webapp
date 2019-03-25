package fr.corentind.allonounou.asmatmanager.asmat;

import fr.corentind.allonounou.asmatmanager.exception.AsmatAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/asmats")
public class AsmatController {

    private AsmatService asmatService;

    @Autowired
    public AsmatController(AsmatService asmatService) {
        this.asmatService = asmatService;
    }

    @GetMapping
    public ResponseEntity<List<AsmatDto>> getAll(@RequestParam(value = "city", required = false) final String city) {
        if (city != null) {
            return ResponseEntity.ok(asmatService.getByCity(city));
        }
        return ResponseEntity.ok(asmatService.getAll());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<AsmatDto> getById(@PathVariable("id") final Long id) {
        return ResponseEntity.of(asmatService.getById(id));
    }

    @GetMapping(path = "/cities")
    public ResponseEntity<List<String>> getCities() {
        return ResponseEntity.ok(asmatService.getCitiesFromAsmats());
    }

    @PostMapping
    public ResponseEntity<AsmatDto> create(@RequestBody @Valid final AsmatDto asmatDto) throws AsmatAlreadyExistsException {
        final AsmatDto createdAsmatDto = asmatService.create(asmatDto);
        return ResponseEntity
                .created(URI.create(String.format("/asmats/%d", createdAsmatDto.getId())))
                .body(createdAsmatDto);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<AsmatDto> update(@PathVariable("id") final Long id,
                                           @RequestBody @Valid final AsmatDto asmatDto) throws AsmatAlreadyExistsException {
        return ResponseEntity.of(asmatService.update(id, asmatDto));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity deleteById(@PathVariable("id") final Long id) {
        return asmatService.deleteById(id) ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException() {
        final Map<String, String> body = new HashMap<>();
        body.put("message", "ID must not be null and match with body ID.");
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(AsmatAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(AsmatAlreadyExistsException e) {
        final Map<String, String> body = new HashMap<>();
        body.put("message", e.getMessage());
        return ResponseEntity.badRequest().body(body);
    }
}
