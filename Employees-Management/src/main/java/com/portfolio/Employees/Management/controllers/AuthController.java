package com.portfolio.Employees.Management.controllers;

import com.portfolio.Employees.Management.dtos.AuthRequest;
import com.portfolio.Employees.Management.dtos.AuthResponse;
import com.portfolio.Employees.Management.model.User;
import com.portfolio.Employees.Management.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        // Lógica de autenticación
        AuthResponse authResponse = authService.authenticate(request);
        return ResponseEntity.ok(authResponse);  // Devuelve la respuesta en formato JSON
    }
    @PostMapping("/login/save")
    public ResponseEntity<Map<String, String>> saveUser(@RequestBody User user) {
        authService.saveUser(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User saved");
        return ResponseEntity.ok(response);
    }

}
