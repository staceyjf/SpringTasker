package com.todo.todo.todo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.todo.colour.ColourService;

import jakarta.transaction.Transactional;

@Service // handles business logic
@Transactional // each method is wrapped in a transaction
public class TodoService {
    @Autowired // enables dependency injection - a pattern which helps build loosely coupled
               // code (easier to test)
    private ModelMapper mapper;

    @Autowired // it auto "injects" the Todo repo into the service so it can use repo
    private TodoRepository repo;

    @Autowired
    private ColourService colourService;

    public List<Todo> findAllTodos() {
        return this.repo.findAll();
    }

    // TASK add find by id, create, delete, update

}
