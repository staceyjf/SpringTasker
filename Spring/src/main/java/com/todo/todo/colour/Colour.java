package com.todo.todo.colour;

import com.todo.todo.common.BaseEntity;
import com.todo.todo.todo.Todo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "colours")
public class Colour extends BaseEntity {

    @Column(unique = true)
    private String name;

    @Column
    private String hexCode;

    // sort by colour
    @OneToMany(mappedBy = "colour")
    @JsonIgnoreProperties("colour")
    private List<Todo> todos;

    public Colour() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHexCode() {
        return hexCode;
    }

    public void setHexCode(String hexCode) {
        this.hexCode = hexCode;
    }

    public List<Todo> getTodos() {
        return todos;
    }

}
