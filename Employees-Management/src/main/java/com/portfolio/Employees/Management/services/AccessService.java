package com.portfolio.Employees.Management.services;

import com.portfolio.Employees.Management.model.Access;
import com.portfolio.Employees.Management.repositories.AccessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccessService {

    @Autowired
    private AccessRepository accessRepository;

    public List<Access> findAll() {
        return accessRepository.findAll();
    }
}
