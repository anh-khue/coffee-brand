package io.cobra.customerservice.controller;

import io.cobra.customerservice.model.Customer;
import io.cobra.customerservice.model.Levels;
import io.cobra.customerservice.service.CustomerService;
import io.cobra.customerservice.service.LevelService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {

    private final CustomerService customerService;
    private final LevelService levelService;

    public CustomerController(CustomerService customerService, LevelService levelService) {
        this.customerService = customerService;
        this.levelService = levelService;
    }

    @GetMapping("/customer/{id}")
    public Customer getById(@PathVariable("id") int id) {
        return this.customerService.getById(id);
    }

    @GetMapping("/customer")
    public List<Customer> getAll() {
        return this.customerService.getAll();
    }

    @PostMapping(value = "/customer", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody Customer customer) {
        if (this.customerService.getById(customer.getId()) == null
                && this.customerService.getByEmail(customer.getEmail()) == null) {
            Levels levels = levelService.getById(customer.getLevelId());
            customer.setDiscountRate(levels.getDiscountRate());
            this.customerService.create(customer);

        }
    }

    @PutMapping(value = "/customer", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(@RequestBody Customer customer) {
        if (this.customerService.getById(customer.getId()) != null
                && this.customerService.getByEmail(customer.getEmail()) == null) {
            Levels levels = this.levelService.getById(customer.getLevelId());
            customer.setDiscountRate(levels.getDiscountRate());
            this.customerService.update(customer);
        }
    }

    @DeleteMapping(value = "/customer/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void delete(@PathVariable("id") int id){
        if(this.customerService.getById(id)!=null){
            this.customerService.delete(id);
        }
    }
}
