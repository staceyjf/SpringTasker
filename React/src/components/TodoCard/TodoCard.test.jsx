import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoCard from "./TodoCard";

describe("TodoCard", () => {
  beforeEach(() => {
    render(
      <TodoCard
        id={1}
        createdAt={new Date("2024-05-21")}
        dueDate={new Date("2024-05-22")}
        title="My test header"
        task="My test paragraph with lots and lots of words."
        isComplete={false}
        colour={{
          id: 1,
          createdAt: new Date("2024-05-20").toISOString(),
          name: "red",
          hexCode: "#ff0000",
          todos: [],
        }}
      />
    );

    it("should check ");
  });
});
