import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
  const onSubmit = vi.fn((fn) => fn); //mock up of a function
  const defaultValues = {
    title: "Tester title",
    task: "Tester task",
    dueDate: new Date().toISOString(),
    isComplete: false,
    colourId: "1",
  };

  beforeEach(() => {
    render(
      <TodoForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        mode="Create"
      />
    );
  });

  // Add assertions here to check that the user input is displayed correctly
  it("should return the user input for the title text field", async () => {
    const input = await screen.findByLabelText("Title");
    const user = userEvent.setup();
    await user.type(input, "My new title");
    expect(input).toHaveValue("My new title");
  });
});
