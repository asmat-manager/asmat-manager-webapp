package fr.corentind.allonounou.asmatmanager.asmat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

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

    @PostMapping
    public ResponseEntity<AsmatDto> create(@RequestBody @Valid final AsmatDto asmatDto) {
        final AsmatDto createdAsmatDto = asmatService.create(asmatDto);
        return ResponseEntity
                .created(URI.create(String.format("/asmats/%d", createdAsmatDto.getId())))
                .body(createdAsmatDto);
    }

}
