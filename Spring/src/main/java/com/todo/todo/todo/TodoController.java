package com.todo.todo.todo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

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

    @PostMapping()
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody CreateTodoDTO data) {
        Todo createdTodo = this.todoService.createTodo(data);
        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    @Tag(name = "get", description = "GET methods of todo API")
    @Operation(summary = "Get all todo tasks", description = "Get a list of all created todos. The response is a list of todo objects containing id, date created etc.")
    @GetMapping() // annotation to handle get requests
    public ResponseEntity<List<Todo>> findAllTodos() {
        List<Todo> allTodos = this.todoService.findAllTodos();
        return new ResponseEntity<>(allTodos, HttpStatus.OK);
    }
}
