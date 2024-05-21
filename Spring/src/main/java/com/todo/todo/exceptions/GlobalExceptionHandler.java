package com.todo.todo.exceptions;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

// makes it the central point for handling exceptions
@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LogManager.getLogger(GlobalExceptionHandler.class);

    // Handle custom 404 error
    @ExceptionHandler(NotFoundByIdException.class)
    public ResponseEntity<GlobalError> handleNotFoundEntity(NotFoundByIdException ex) {
        GlobalError customError = new GlobalError(HttpStatus.NOT_FOUND, ex);
        logger.error(customError.getDebugMessage());
        return new ResponseEntity<>(customError, customError.getStatusCode());
    }

    // Handle 400 error
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<GlobalError> handleInvalidResourceException(HttpMessageNotReadableException ex) {
        GlobalError error = new GlobalError(HttpStatus.BAD_GATEWAY, ex);
        logger.error(error.getDebugMessage());
        return new ResponseEntity<>(error, error.getStatusCode());
    }

}
