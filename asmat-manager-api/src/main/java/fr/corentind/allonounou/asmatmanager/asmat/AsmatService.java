package fr.corentind.allonounou.asmatmanager.asmat;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AsmatService {

    private ModelMapper modelMapper;
    private AsmatRepository asmatRepository;

    @Autowired
    public AsmatService(ModelMapper modelMapper, AsmatRepository asmatRepository) {
        this.modelMapper = modelMapper;
        this.asmatRepository = asmatRepository;
    }

    List<AsmatDto> getAll() {
        return asmatRepository.findAll()
                .stream()
                .map(this::mapAsmatToAsmatDto)
                .collect(Collectors.toList());
    }

    private AsmatDto mapAsmatToAsmatDto(final Asmat asmat) {
        return modelMapper.map(asmat, AsmatDto.class);
    }

}
