package com.portfolio.Employees.Management.controllers;

import com.portfolio.Employees.Management.dtos.AuthRequest;
import com.portfolio.Employees.Management.dtos.AuthResponse;
import com.portfolio.Employees.Management.services.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        System.out.println("Intentando autenticar: " + request.getUsername());
        return authService.authenticate(request);
    }
}
