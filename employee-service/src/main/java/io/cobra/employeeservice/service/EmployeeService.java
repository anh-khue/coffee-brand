package io.cobra.employeeservice.service;

import io.cobra.employeeservice.model.Employee;
import io.cobra.employeeservice.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }
}
