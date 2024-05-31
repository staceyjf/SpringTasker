import { render, waitFor, screen } from "@testing-library/react";
import ColoursContextProvider from "../../context/ColourContextProvider";
import AddTodoPage from "./AddTodoPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";

// mock up a failed createTodo request
vi.mock("../../services/todo-services", () => ({
  createTodo: vi.fn(() =>
    Promise.reject(
      new Error("Failed to submit your new todo. Please try again.")
    )
  ),
}));

// mock up of the colours context
vi.mock("../../services/colour-services", () => ({
  getAllColours: vi.fn(() => Promise.resolve([])),
}));

describe("AddTodoPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render an error message if createTodo fails", () => {
    render(
      <BrowserRouter>
        <ColoursContextProvider>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/todo/new" element={<AddTodoPage />} />
          </Routes>
        </ColoursContextProvider>
      </BrowserRouter>
    );

    waitFor(() => {
      const errorAlert = screen.getByTestId("error-alert");
      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveTextContent(
        "Failed to submit your new todo. Please try again."
      );
    });
  });
});
