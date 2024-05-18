package com.todo.todo.colour;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class CreateColourDTO {
    @NotBlank
    private String name;

    @NotBlank
    // ensure hexCode are saved correctly
    // #ffffff 6 character format
    // #fff or 3 character format
    @Pattern(regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
    private String hexCode;

    public CreateColourDTO() {
    }

    public String getName() {
        return name;
    }

    public String gethexCode() {
        return hexCode;
    }

}