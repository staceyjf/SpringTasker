package com.todo.todo.todo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.todo.colour.Colour;
import com.todo.todo.colour.ColourService;
import com.todo.todo.exceptions.ServiceValidationException;
import com.todo.todo.exceptions.ValidationErrors;

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

    public Todo createTodo(CreateTodoDTO data) throws ServiceValidationException {
        Todo newTodo = mapper.map(data, Todo.class);
        Long colourId = data.getColourId();
        Optional<Colour> maybeColour = this.colourService.findById(colourId);
        ValidationErrors errors = new ValidationErrors();

        if (maybeColour.isEmpty()) {
            errors.addError("colour", String.format("Colour with id %s does not exist", colourId));
        } else {
            newTodo.setColour(maybeColour.get());
        }

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        return this.repo.save(newTodo);
    }

    // will return an empty array so no need for error handling
    public List<Todo> findAllTodos() {
        return this.repo.findAll();
    }

    public Optional<Todo> findById(Long id) {
        return this.repo.findById(id);
    }

    // TASK add find by id, create, delete, update

}
