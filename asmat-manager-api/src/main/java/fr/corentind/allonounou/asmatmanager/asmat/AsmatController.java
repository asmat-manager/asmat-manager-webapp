package fr.corentind.allonounou.asmatmanager.asmat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;
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
    public ResponseEntity<List<AsmatDto>> getAll() {
        return ResponseEntity.ok(asmatService.getAll());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<AsmatDto> getById(@PathVariable("id") final Long id) {
        return ResponseEntity.of(asmatService.getById(id));
    }

    @PostMapping
    public ResponseEntity<AsmatDto> create(@RequestBody @Valid final AsmatDto asmatDto) {
        final AsmatDto createdAsmatDto = asmatService.create(asmatDto);
        return ResponseEntity
                .created(URI.create(String.format("/asmats/%d", createdAsmatDto.getId())))
                .body(createdAsmatDto);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<AsmatDto> update(@PathVariable("id") final Long id,
                                           @RequestBody @Valid final AsmatDto asmatDto) {
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
}
