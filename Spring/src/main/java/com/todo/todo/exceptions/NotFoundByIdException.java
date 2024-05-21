package com.todo.todo.exceptions;

public class NotFoundByIdException extends Exception {
    public <T> NotFoundByIdException(Class<T> entityType, Long id) {
        super(String.format("Could not find %s with id: %d,", entityType.getSimpleName(), id));
    }

}
