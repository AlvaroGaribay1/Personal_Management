package com.portfolio.Employees.Management.repositories;

import com.portfolio.Employees.Management.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
