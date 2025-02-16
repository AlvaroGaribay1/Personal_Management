package com.portfolio.Employees.Management.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Data
@Table(name = "Users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username")
    private String username;
    private String password;
    private String email;


    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }
}
