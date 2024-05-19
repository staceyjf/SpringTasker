package com.todo.todo.colour;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

    @PostMapping()
    // valid annotation ensure that the request body meets the validation
    // constraints (DTO)
    // if it doesn't you will get a MethodArgumentNotValidException -> 400 (bad
    // request)
    // this is not caught by the catch block
    public ResponseEntity<Colour> createColour(@Valid @RequestBody CreateColourDTO data) {
        try {
            Colour newColour = this.colourService.create(data);
            logger.info("Responding with new colour: " + newColour);
            return new ResponseEntity<>(newColour, HttpStatus.CREATED);
        } catch (Exception e) {
            // catch all error
            // eg there is no specific exception for a SQLException
            // if the new colour fails to be saved in the db, we will send the client a 500
            // (InternalSever Error)
            logger.error("Failed to create new colour", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping()
    public ResponseEntity<List<Colour>> findAllColours() {
        List<Colour> allColours = this.colourService.findAll();
        logger.info("Responding with a list of colours: " + allColours);
        return new ResponseEntity<>(allColours, HttpStatus.OK);
    }

}