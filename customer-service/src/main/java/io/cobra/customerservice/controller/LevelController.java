package io.cobra.customerservice.controller;

import io.cobra.customerservice.model.Levels;
import io.cobra.customerservice.service.LevelService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LevelController {

    private final LevelService levelService;

    public LevelController(LevelService levelService) {
        this.levelService = levelService;
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
        }
    }

}
