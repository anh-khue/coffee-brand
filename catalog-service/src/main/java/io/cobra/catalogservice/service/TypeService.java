package io.cobra.catalogservice.service;

import io.cobra.catalogservice.model.Type;
import io.cobra.catalogservice.repository.TypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeService {
    private final TypeRepository typeRepository;

    public TypeService(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public List<Type> getAll() {
        return this.typeRepository.findAll();
    }

    public Type getById(int id) {
        return this.typeRepository.findById(id);
    }
}
