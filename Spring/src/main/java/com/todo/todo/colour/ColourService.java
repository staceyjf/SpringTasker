package com.todo.todo.colour;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class ColourService {
    private static final Logger logger = LogManager.getLogger(ColourService.class);

    @Autowired
    private ColourRepository repo;

    @Autowired
    ModelMapper mapper;

    public Colour create(@Valid CreateColourDTO data) {
        Colour newColour = mapper.map(data, Colour.class); // ModelMapper auto maps this for us
        logger.info("Created new colour in mySql: " + newColour);
        return this.repo.save(newColour);
    }

    public List<Colour> findAll() {
        return this.repo.findAll();
    }

    // no controller as this method is accessed by the todo domain
    public Optional<Colour> findById(Long id) {
        return this.repo.findById(id);
    }

}
