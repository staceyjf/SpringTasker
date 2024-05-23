package com.todo.todo.todo;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;


public class UpdateTodoDTO {
    @Pattern(regexp = ".*\\S.*", message = "Title cannot be empty")
    private String title;

    @Pattern(regexp = ".*\\S.*", message = "Task cannot be empty")
    private String task;

    @FutureOrPresent 
    private LocalDate dueDate;

    private Boolean isComplete;

    @NotNull
    @Min(1)
    private Long colourId;

    public String getTitle() {
        return title;
    }

    public String getTask() {
        return task;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public Long getColourId() {
        return colourId;
    }

    
}
