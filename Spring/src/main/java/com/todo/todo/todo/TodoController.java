package com.todo.todo.todo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todo.colour.ColourController;
import com.todo.todo.exceptions.NotFoundByIdException;
import com.todo.todo.exceptions.ServiceValidationException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/todos")
public class TodoController {
    @Autowired
    private TodoService todoService;

    private static final Logger logger = LogManager.getLogger(ColourController.class);

    // errors bubble up and are handled by the globalExceptionHandler

    @Tag(name = "POST", description = "POST methods of todo API")
    @Operation(summary = "Create a new Todo task", description = "Create a new Todo task. The response is a new Todo object with title, task description, date created, due date and isComplete.")
    @PostMapping()
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody CreateTodoDTO data) throws ServiceValidationException {
        Todo createdTodo = this.todoService.createTodo(data);
        logger.info("Responding with new todo task: " + createdTodo);
        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    @Tag(name = "GET", description = "GET methods of todo API")
    @Operation(summary = "Get all todo tasks", description = "Get a list of all created todos. The response is a list of todo objects containing id, date created etc.")
    @GetMapping() // annotation to handle get requests
    public ResponseEntity<List<Todo>> findAllTodos() {
        List<Todo> allTodos = this.todoService.findAllTodos();
        logger.info("Responding with a list of todo tasks: " + allTodos);
        return new ResponseEntity<>(allTodos, HttpStatus.OK);
    }

    @Tag(name = "GET", description = "GET methods of todo API")
    @Operation(summary = "Get todo task by Id", description = "Get a specific todo task by its id. The response is a Todo object with title, task description, date created, due date and isComplete.")
    @GetMapping("/{id}")
    public ResponseEntity<Todo> findTodoById(@PathVariable Long id) throws NotFoundByIdException {
        Optional<Todo> maybePost = this.todoService.findById(id);
        Todo foundTodo = maybePost.orElseThrow(() -> new NotFoundByIdException(Todo.class, id));
        logger.info("Responding with the found todo: " + foundTodo);
        return new ResponseEntity<>(foundTodo, HttpStatus.OK);
    }

    @Tag(name = "PATCH", description = "PATCH methods of todo API")
    @Operation(summary = "Update a todo task by Id", description = "Edit an existing todo task by id. The response is a Todo object with title, task description, date created, due date and isComplete.")
    @PatchMapping("/{id}")
    public ResponseEntity<Todo> updateTodoById(@PathVariable Long id, @Valid @RequestBody UpdateTodoDTO data)
            throws NotFoundByIdException, ServiceValidationException {
        Optional<Todo> maybeTodo = this.todoService.updateById(id, data);
        Todo updatedTodo = maybeTodo.orElseThrow(() -> new NotFoundByIdException(Todo.class, id));
        logger.info("Responding with the updated todo: " + updatedTodo);
        return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
    }

    @Tag(name = "DELETE", description = "DELETE methods of todo API")
    @Operation(summary = "Delete a todo task by Id", description = "Delete an existing todo task by id.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable Long id)
            throws NotFoundByIdException, ServiceValidationException {
        boolean isDeleted = this.todoService.deleteById(id);
        if (!isDeleted) {
            throw new NotFoundByIdException(Todo.class, id);
        }
        logger.info(String.format("Todo with id: %d has been deleted ", id));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
