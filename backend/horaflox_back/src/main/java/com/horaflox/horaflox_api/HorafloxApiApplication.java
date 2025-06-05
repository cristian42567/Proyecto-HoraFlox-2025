package com.horaflox.horaflox_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class HorafloxApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(HorafloxApiApplication.class, args);
	}

	/*
	Configuración global de CORS.
	Esto permite que el frontend de Angular pueda hacer peticiones HTTP al backend.

	-addMapping, permite todas las rutas de la API.
	-allowedOrigins, permite peticiones desde la ruta que le hemos puesto, en este caso angular es http://localhost:4200.
	-allowedMethods, permite cualquier tipo de método HTTP, como puede ser (GET, POST, PUT, DELETE).
	-allowedHeaders, permite cualquier cabecera HTTP.
	 */

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:4200").allowedMethods("*").allowedHeaders("*");
			}
		};
	}

}
