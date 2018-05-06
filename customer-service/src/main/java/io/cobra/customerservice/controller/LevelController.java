package io.cobra.customerservice.controller;

import io.cobra.customerservice.model.Customer;
import io.cobra.customerservice.model.Level;
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
    public Level getById(@PathVariable("id") int id) {
        return this.levelService.getById(id);
    }

    @GetMapping("/level")
    public List<Level> getAll() {
        return this.levelService.getAll();
    }

    @PostMapping(value = "/level", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody Level level) {
        this.levelService.create(level);
    }

    @PutMapping(value = "/level/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(@RequestBody Level level) {
        if (this.levelService.getById(level.getId()) != null) {
            this.levelService.update(level);
            Customer customer = this.customerService.getByLevelId(level.getId());
            customer.setDiscountRate(level.getDiscountRate());
            this.customerService.update(customer);
        }
    }

}
