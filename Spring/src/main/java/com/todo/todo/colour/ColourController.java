package com.todo.todo.colour;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/colours")
public class ColourController {

    @Autowired
    private ColourService colourService;

    @PostMapping()
    // valid annotation ensure that the request body meets the validation
    // constraints
    // if it doesn't you will get a 400
    public ResponseEntity<Colour> createColour(@Valid @RequestBody CreateColourDTO data) {
        Colour newColour = this.colourService.create(data);
        return new ResponseEntity<>(newColour, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Colour>> findAllColours() {
        List<Colour> allColours = this.colourService.findAll();
        return new ResponseEntity<>(allColours, HttpStatus.OK);
    }

}
