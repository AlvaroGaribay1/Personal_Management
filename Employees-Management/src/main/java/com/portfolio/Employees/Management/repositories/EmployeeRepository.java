package com.portfolio.Employees.Management.repositories;

import com.portfolio.Employees.Management.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findAll();
    List<Employee> findByDepartmentId(Long id);
}