package fr.corentind.allonounou.asmatmanager.asmat;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
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

    Optional<AsmatDto> getById(final Long id) {
        return asmatRepository.findById(id)
                .map(this::mapAsmatToAsmatDto);
    }

    AsmatDto create(final AsmatDto asmatDto) {
        final Asmat asmatToSave = mapAsmatDtoToAsmat(asmatDto);
        return mapAsmatToAsmatDto(asmatRepository.save(asmatToSave));
    }

    Optional<AsmatDto> update(final Long id, final AsmatDto asmatDto) throws IllegalArgumentException {
        if (asmatDto.getId() == null || !Objects.equals(id, asmatDto.getId())) {
            throw new IllegalArgumentException();
        }
        return asmatRepository.findById(id)
                .map(asmat -> asmatRepository.save(mapAsmatDtoToAsmat(asmatDto)))
                .map(this::mapAsmatToAsmatDto);
    }

    private AsmatDto mapAsmatToAsmatDto(final Asmat asmat) {
        return modelMapper.map(asmat, AsmatDto.class);
    }

    private Asmat mapAsmatDtoToAsmat(final AsmatDto asmatDto) {
        return modelMapper.map(asmatDto, Asmat.class);
    }
}
