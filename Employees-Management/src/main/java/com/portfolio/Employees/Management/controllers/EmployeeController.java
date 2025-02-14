package com.portfolio.Employees.Management.controllers;

import com.portfolio.Employees.Management.services.EmployeeService;
import com.portfolio.Employees.Management.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    private ResponseEntity<List<Employee>> getAllPeople() {
        return ResponseEntity.ok(employeeService.findAll());
    }

    @GetMapping("/{id}")
    private ResponseEntity<Optional<Employee>> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Employee> saveUser(@RequestBody Employee user) {
        if (user.getDate_out() == null) {
            user.setActive(true);
        } else {
            // Convertimos Date a LocalDate sin horas
            LocalDate dateOut = user.getDate_out().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate today = LocalDate.now(ZoneId.systemDefault());

            // Si date_out es menor a la fecha actual, active = false; si es mayor o igual, active = true
            user.setActive(!dateOut.isBefore(today));
        }
        return ResponseEntity.ok(employeeService.saveUser(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id) {
        employeeService.deleteById(id);
        return ResponseEntity.ok(true);  // Ahora devuelve un JSON válido
    }

    @GetMapping("/department/{id}")
    public ResponseEntity<List<Employee>> findByDepartment(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.findByDepartment(id));
    }






}
