package com.todo.todo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

// makes it the central point for handling exceptions
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundByIdException.class)
    public ResponseEntity<GlobalError> handleNotFoundEntity(NotFoundByIdException ex) {
        GlobalError customError = new GlobalError(HttpStatus.NOT_FOUND, ex);
        return new ResponseEntity<>(customError, NotFoundByIdException.getStatusCode());
    }

}
