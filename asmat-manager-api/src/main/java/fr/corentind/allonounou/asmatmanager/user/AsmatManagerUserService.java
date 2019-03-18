package fr.corentind.allonounou.asmatmanager.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AsmatManagerUserService implements UserDetailsService {

    private AsmatUserRepository asmatUserRepository;

    @Autowired
    public AsmatManagerUserService(AsmatUserRepository asmatUserRepository) {
        this.asmatUserRepository = asmatUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        return asmatUserRepository.findByUsername(username)
                .map(user -> new User(
                        user.getUsername(),
                        user.getPassword(),
                        new ArrayList<>()
                ))
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }
}
