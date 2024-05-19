package com.todo.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@SpringBootApplication
public class TodoApplication {

	private static final Logger logger = LogManager.getLogger(TodoApplication.class);

	public static void main(String[] args) {
		// instructs JVM to use Log4j2's LogManager for any log messages
		System.setProperty("java.util.logging.manager", "org.apache.logging.log4j.jul.LogManager");
		SpringApplication.run(TodoApplication.class, args);
		logger.info("Todo Application has successfully loaded");
	}
}