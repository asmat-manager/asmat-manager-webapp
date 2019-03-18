package fr.corentind.allonounou.asmatmanager.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AsmatUserRepository extends JpaRepository<AsmatManagerUser, Long> {
    Optional<AsmatManagerUser> findByUsername(final String username);
}
