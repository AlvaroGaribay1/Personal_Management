package com.portfolio.Employees.Management.services;

import com.portfolio.Employees.Management.repositories.EmployeeRepository;
import com.portfolio.Employees.Management.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee saveUser(Employee user) {
        return employeeRepository.save(user);
    }

    public void deleteById(Long id) {
        employeeRepository.deleteById(id);
    }

    public List<Employee> findByDepartment(Long id) {
        return employeeRepository.findByDepartmentId(id);
    }


}
