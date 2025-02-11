package com.portfolio.Employees.Management.controllers;

import com.portfolio.Employees.Management.model.Access;
import com.portfolio.Employees.Management.services.AccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/access")
public class AccessController{

    @Autowired
    private AccessService accessService;

    @GetMapping
    public List<Access> getAllAccess() {
        return accessService.findAll();
    }
}
