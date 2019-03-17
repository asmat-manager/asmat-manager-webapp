package fr.corentind.allonounou.asmatmanager.asmat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
