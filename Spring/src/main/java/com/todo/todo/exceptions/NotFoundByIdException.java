package com.todo.todo.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundByIdException extends Exception {
    private static final HttpStatus statusCode = HttpStatus.NOT_FOUND;

    public <T> NotFoundByIdException(Class<T> entityType, Long id) {
        super(String.format("Could not find %s with id: %d,", entityType.getSimpleName(), id));
    }

    public static HttpStatus getStatusCode() {
        return statusCode;
    }

}
