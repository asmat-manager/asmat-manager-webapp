package fr.corentind.allonounou.asmatmanager.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AsmatManagerConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
