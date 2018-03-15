package io.cobra.customerservice.service;

import io.cobra.customerservice.model.Levels;
import io.cobra.customerservice.repository.LevelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LevelService {

    private final LevelRepository levelRepository;

    public LevelService(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    public Levels getById(int id){
        return this.levelRepository.findById(id);
    }

    public List<Levels> getAll(){
        return this.levelRepository.findAll();
    }

    public void create(Levels levels){
        this.levelRepository.save(levels);
    }

    public void update(Levels levels){
        if(this.levelRepository.findById(levels.getId())!=null){
            this.levelRepository.save(levels);
        }
    }
}
