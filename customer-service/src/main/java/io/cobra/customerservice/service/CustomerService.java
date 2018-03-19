package io.cobra.customerservice.service;


import io.cobra.customerservice.model.Customer;
import io.cobra.customerservice.model.Level;
import io.cobra.customerservice.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    private final LevelService levelService;
    
    public CustomerService(CustomerRepository customerRepository, LevelService levelService) {
        this.customerRepository = customerRepository;
        this.levelService = levelService;
    }
    
    public Customer getById(int id) {
        return this.customerRepository.findById(id);
    }
    
    public List<Customer> getAll() {
        return this.customerRepository.findAll();
    }
    
    public void create(Customer customer) {
        this.customerRepository.save(customer);
    }
    
    public void delete(int id) {
        this.customerRepository.deleteById(id);
    }
    
    public void update(Customer customer) {
        if (this.customerRepository.findById(customer.getId()) != null) {
            List<Level> levels = levelService.getAll()
                                             .stream()
                                             .sorted(Comparator.comparing(Level::getRequiredPoint))
                                             .collect(Collectors.toList());
            boolean found = false;
            int i = levels.size() - 1;
            do {
                if (levels.get(i).getRequiredPoint() <= customer.getPoint()) {
                    customer.setLevelId(levels.get(i).getId());
                    found = true;
                }
                i--;
            } while (found);
            this.customerRepository.save(customer);
        }
    }
    
    public Customer getByEmail(String email) {
        return this.customerRepository.findByEmail(email);
    }
    
    public Customer getByLevelId(int levelId) {
        return this.customerRepository.findByLevelId(levelId);
    }
    
}
