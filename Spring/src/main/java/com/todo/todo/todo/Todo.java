package com.todo.todo.todo;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.todo.todo.colour.Colour;
import com.todo.todo.common.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "todos")
public class Todo extends BaseEntity {

    @Column
    private LocalDate dueDate;

    @Column
    @NotNull
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String task;

    @Column
    private Boolean isComplete;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "colour_id")
    @JsonIgnoreProperties("todos")
    private Colour colour;

    Todo() {
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate updatedDueDate) {
        this.dueDate = updatedDueDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public void setColour(Colour colour) {
        this.colour = colour;
    }
}
