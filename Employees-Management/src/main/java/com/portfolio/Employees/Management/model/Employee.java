package com.portfolio.Employees.Management.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "employees")
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "date_in")
    private Date date_in;
    @Column(name = "date_out")
    private Date date_out;
    @ManyToOne
    @JoinColumn(name = "access_Level")
    private Access access;
    @ManyToOne
    @JoinColumn(name = "department")
    private Department department;
    @Column(name = "Active")
    private boolean active;

    public Date getDate_out() {
        return this.date_out;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}
