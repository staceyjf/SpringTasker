package com.todo.todo.todo;

import org.springframework.data.jpa.repository.JpaRepository;

//contains the API for basic CRUD operations and API for pagination and sorting
// Long is the type of the primary key
public interface TodoRepository extends JpaRepository<Todo, Long> {

}
