package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Ajoute les mappings nécessaires
                .allowedOrigins("http://localhost:4200") // Autorise ton frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Méthodes autorisées
                .allowedHeaders("*"); // Autorise tous les headers
    }
}
