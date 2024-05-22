package com.todo.todo.colour;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/colours")
public class ColourController {

    @Autowired
    private ColourService colourService;

    // adding the logger instance
    private static final Logger logger = LogManager.getLogger(ColourController.class);

    @Tag(name = "post", description = "POST methods for todo API")
    @Operation(summary = "Create a new colour", description = "Create a new colour categorization for todo. The response is a new Colour object with id, createdAt, colour name, hex code")
    @PostMapping()
    // valid annotation ensure that the request body meets the validation
    // constraints (DTO)
    // if it doesn't you will get a MethodArgumentNotValidException -> 400 (bad
    // request)
    public ResponseEntity<Colour> createColour(@Valid @RequestBody CreateColourDTO data) {
        Colour newColour = this.colourService.create(data);
        logger.info("Responding with new colour: " + newColour);
        return new ResponseEntity<>(newColour, HttpStatus.CREATED);
    }

    @Tag(name = "get", description = "GET methods of todo API")
    @Operation(summary = "Get all colours", description = "Get a list of all available colour categorizations. The response is a list of colour objects containing colour name and hex code.")
    @GetMapping()
    public ResponseEntity<List<Colour>> findAllColours() {
        List<Colour> allColours = this.colourService.findAll();
        logger.info("Responding with a list of colours: " + allColours);
        return new ResponseEntity<>(allColours, HttpStatus.OK);
    }

}
