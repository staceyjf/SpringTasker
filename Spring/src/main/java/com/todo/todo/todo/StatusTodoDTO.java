package com.todo.todo.todo;

import jakarta.validation.constraints.NotNull;

public class StatusTodoDTO {
    @NotNull
    private Boolean isComplete;

    public Boolean getIsComplete() {
        return isComplete;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    
}
