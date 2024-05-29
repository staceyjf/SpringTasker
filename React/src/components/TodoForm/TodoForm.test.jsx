import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
  const handleFormSubmit = vi.fn((fn) => fn); //mock up of a function
  const defaultValues = {
    task: "Tester task",
    dueDate: new Date().toISOString(),
    isComplete: false,
    colourId: "1",
  };

  const useFormMock = () => ({
    control: {}, // mock control object
    formState: { errors: {} }, // mock formState object
  });

  const TodoFormWrapper = (props) => {
    const formMethods = useFormMock();
    return <TodoForm {...props} control={formMethods.control} />;
  };

  it("should display the input of the user", () => {
    render(
      <TodoFormWrapper
        handleFormSubmit={handleFormSubmit}
        defaultValues={defaultValues}
        mode="Create"
      />
    );

    // Add assertions here to check that the user input is displayed correctly
    it("should return the user input for the title text field", async () => {
      const input = await screen.findById("titleInput");
      await userEvent.type(input, "My new title");
      expect(input).toHaveValue("My new title");
    });
  });
});
