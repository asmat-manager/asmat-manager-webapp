package fr.corentind.allonounou.asmatmanager.asmat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsmatRepository extends JpaRepository<Asmat, Long> {
}
