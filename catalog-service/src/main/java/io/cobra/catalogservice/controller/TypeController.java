package io.cobra.catalogservice.controller;

import io.cobra.catalogservice.model.Type;
import io.cobra.catalogservice.service.TypeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class TypeController {
    private final TypeService typeService;

    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping("/types")
    public List<Type> viewAllTypes() {
        return this.typeService.getAll();
    }

    @GetMapping("/types/{id}")
    public Type viewById(@PathVariable("id") int id) {
        return this.typeService.getById(id);
    }
}
