package com.todo.todo.todo;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateTodoDTO {

    @NotBlank
    @Size(max = 50, message = "Title should be smaller than 50 characters")
    private String title;

    @NotBlank
    @Size(max = 200, message = "Task should be smaller than 200 characters")
    private String task;

    @FutureOrPresent // ensure its set today or in the future
    private LocalDate dueDate;

    // initial set the task to in complete
    private Boolean isComplete = false;

    @NotNull
    @Min(1)
    private Long colourId;

    public LocalDate getDueDate() {
        return dueDate;
    }

    public String getTitle() {
        return title;
    }

    public String getTask() {
        return task;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public Long getColourId() {
        return colourId;
    }

}
