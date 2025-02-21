package com.portfolio.Employees.Management.dtos;

import lombok.*;


import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class AuthResponse {
    private String token;
    private Long userId;
    private String username;
    private String email;
    private String role;

    public AuthResponse(String token, Long userId, String username, String email, String role) {
        this.token = token;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    @Override
    public String toString() {
        return "AuthResponse{" +
                "token='" + token + '\'' +
                ", userId=" + userId +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", roles=" + role +
                '}';
    }

    // Getters y Setters
}
