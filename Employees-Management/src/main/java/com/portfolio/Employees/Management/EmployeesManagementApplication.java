package com.portfolio.Employees.Management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class EmployeesManagementApplication {

		public static void main(String[] args) {
			SpringApplication.run(EmployeesManagementApplication.class, args);
		}

}
