package io.cobra.customerservice.service;


import io.cobra.customerservice.model.Customer;
import io.cobra.customerservice.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer getById(int id){
        return this.customerRepository.findById(id);
    }

    public List<Customer> getAll(){
        return this.customerRepository.findAll();
    }

    public void create(Customer customer){
        this.customerRepository.save(customer);
    }

    public void delete(int id){
        this.customerRepository.deleteById(id);
    }

    public void update(Customer customer){
        if(this.customerRepository.findById(customer.getId())!=null){
            this.customerRepository.save(customer);
        }
    }

    public Customer getByEmail(String emai){
        return this.customerRepository.findByEmail(emai);
    }


}
