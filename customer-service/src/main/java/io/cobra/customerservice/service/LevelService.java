package io.cobra.customerservice.service;

import io.cobra.customerservice.model.Level;
import io.cobra.customerservice.repository.LevelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LevelService {

    private final LevelRepository levelRepository;

    public LevelService(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    public Level getById(int id){
        return this.levelRepository.findById(id);
    }

    public List<Level> getAll(){
        return this.levelRepository.findAll();
    }

    public void create(Level level){
        this.levelRepository.save(level);
    }

    public void update(Level level){
        if(this.levelRepository.findById(level.getId()) != null){
            this.levelRepository.save(level);
        }
    }
}
