package fr.corentind.allonounou.asmatmanager.asmat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AsmatRepository extends JpaRepository<Asmat, Long>,
        JpaSpecificationExecutor<Asmat> {

    List<Asmat> findAllByAddress_City(final String city);

    @Query("select (count(a) > 0) from Asmat a where lower(a.firstName) = lower(:firstName) and lower(a.lastName) = lower(:lastName)")
    Boolean existsByFirstNameAndLastName(final String firstName, final String lastName);

    @Query("select distinct address.city from Asmat where address.city <> ''")
    List<String> findAllDistinctCities();
}
