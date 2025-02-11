package com.portfolio.Employees.Management.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Data
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "password")
    private String password;
    @ManyToOne
    @JoinColumn(name = "access_Level")
    private Access access;
    @ManyToOne
    @JoinColumn(name = "department")
    private Department department;

}
