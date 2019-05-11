package fr.corentind.allonounou.asmatmanager.asmat;

import fr.corentind.allonounou.asmatmanager.exception.AsmatAlreadyExistsException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
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

    List<AsmatDto> getAll(final String city, final boolean adherentOnly) {
        return queryAsmats(city, adherentOnly)
                .stream()
                .map(this::mapAsmatToAsmatDto)
                .collect(Collectors.toList());
    }

    Optional<AsmatDto> getById(final Long id) {
        return asmatRepository.findById(id)
                .map(this::mapAsmatToAsmatDto);
    }

    List<String> getCitiesFromAsmats() {
        return asmatRepository.findAllDistinctCities();
    }

    AsmatDto create(final AsmatDto asmatDto) throws AsmatAlreadyExistsException {
        if (asmatRepository.existsByFirstNameAndLastName(asmatDto.getFirstName(), asmatDto.getLastName())) {
            throw new AsmatAlreadyExistsException(asmatDto);
        }

        final Asmat asmatToSave = mapAsmatDtoToAsmat(asmatDto);
        return mapAsmatToAsmatDto(asmatRepository.save(asmatToSave));
    }

    Optional<AsmatDto> update(final Long id, final AsmatDto asmatDto) throws IllegalArgumentException, AsmatAlreadyExistsException {
        if (asmatDto.getId() == null || !Objects.equals(id, asmatDto.getId())) {
            throw new IllegalArgumentException();
        }

        final Optional<Asmat> existingAsmat = asmatRepository.findById(id);
        if (!existingAsmat.isPresent()) {
            return Optional.empty();
        }
        final Asmat unwrapedAsmat = existingAsmat.get();
        if (!(unwrapedAsmat.getFirstName().equals(asmatDto.getFirstName()) &&
                unwrapedAsmat.getLastName().equals(asmatDto.getLastName())) &&
                asmatRepository.existsByFirstNameAndLastName(asmatDto.getFirstName(), asmatDto.getLastName())) {
            throw new AsmatAlreadyExistsException(asmatDto);
        }

        return existingAsmat
                .map(asmat -> asmatRepository.save(mapAsmatDtoToAsmat(asmatDto)))
                .map(this::mapAsmatToAsmatDto);
    }

    boolean deleteById(final Long id) {
        if (asmatRepository.existsById(id)) {
            asmatRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private List<Asmat> queryAsmats(final String city, final boolean adherentOnly) {
        return asmatRepository.findAll((Specification<Asmat>) (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (city != null) {
                predicates.add(criteriaBuilder.equal(root.get("address").get("city"), city));
            }
            if (adherentOnly) {
                predicates.add(criteriaBuilder.equal(root.get("adherent"), true));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    private AsmatDto mapAsmatToAsmatDto(final Asmat asmat) {
        return modelMapper.map(asmat, AsmatDto.class);
    }

    private Asmat mapAsmatDtoToAsmat(final AsmatDto asmatDto) {
        return modelMapper.map(asmatDto, Asmat.class);
    }
}
