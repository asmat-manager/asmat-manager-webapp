package fr.corentind.allonounou.asmatmanager.asmat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AsmatRepository extends JpaRepository<Asmat, Long> {

    @Query("select (count(a) > 0) from Asmat a where lower(firstName) = lower(:firstName) and lower(lastName) = lower(:lastName)")
    Boolean existsByFirstNameAndLastName(final String firstName, final String lastName);
}
