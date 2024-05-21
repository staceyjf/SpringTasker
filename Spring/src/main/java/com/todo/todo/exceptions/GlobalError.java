package com.todo.todo.exceptions;

import java.time.LocalDateTime;
import java.util.Arrays;

import org.springframework.http.HttpStatus;

// privates a unified approach to Error Messages
public class GlobalError {
    private HttpStatus status;
    private LocalDateTime timestamp;
    private String apiMessage;
    private String debugMessage;

    public GlobalError(HttpStatus status) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
    }

    public GlobalError(HttpStatus status, Throwable ex) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.apiMessage = ex.getMessage();
        // include StackTrace to show the method calls that led to the exception
        this.debugMessage = ex.getClass().getSimpleName() + ": " + ex.getMessage() + "\n"
                + Arrays.toString(ex.getStackTrace());
    }

    // return the debug message for the logger
    public String getDebugMessage() {
        return this.debugMessage;
    }

    public HttpStatus getStatusCode() {
        return this.status;
    }

}
