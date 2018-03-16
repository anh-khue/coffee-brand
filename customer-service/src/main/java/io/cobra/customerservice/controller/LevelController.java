package io.cobra.customerservice.controller;

import io.cobra.customerservice.model.Customer;
import io.cobra.customerservice.model.Levels;
import io.cobra.customerservice.service.CustomerService;
import io.cobra.customerservice.service.LevelService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LevelController {

    private final LevelService levelService;
    private final CustomerService customerService;

    public LevelController(LevelService levelService, CustomerService customerService) {
        this.levelService = levelService;
        this.customerService = customerService;
    }

    @GetMapping("/level/{id}")
    public Levels getById(@PathVariable("id") int id) {
        return this.levelService.getById(id);
    }

    @GetMapping("/level")
    public List<Levels> getAll() {
        return this.levelService.getAll();
    }

    @PostMapping(value = "/level", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody Levels levels) {
        this.levelService.create(levels);
    }

    @PutMapping(value = "/level/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(@RequestBody Levels levels) {
        if (this.levelService.getById(levels.getId()) != null) {
            this.levelService.update(levels);
            Customer customer = this.customerService.getByLevelId(levels.getId());
            customer.setDiscountRate(levels.getDiscountRate());
            this.customerService.update(customer);
        }
    }

}
