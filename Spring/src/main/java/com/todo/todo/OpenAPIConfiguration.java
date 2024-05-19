package com.todo.todo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.info.Contact;
import java.util.List;

@Configuration
public class OpenAPIConfiguration {

    @Bean
    public OpenAPI defineOpenApi() {
        Server server = new Server();
        server.setUrl("http://localhost:8080");
        server.setDescription("Development");

        Contact myContact = new Contact();
        myContact.setName("Stacey Fanner");
        myContact.setEmail("staceyfanner@gmail.com");

        Info information = new Info()
                .title("nology todo API")
                .version("1.0")
                .description("This API exposes endpoints to manage a front end todo app.")
                .contact(myContact);
        return new OpenAPI().info(information).servers(List.of(server));
    }
}
