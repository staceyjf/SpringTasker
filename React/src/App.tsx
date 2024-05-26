import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import TodoIndex from "./pages/TodoIndex/TodoIndex";
import "./App.scss";
import AddTodoPage from "./pages/AddTodoPage/AddTodoPage";
import ColoursContextProvider from "./context/ColourContextProvider";

function App() {
  return (
    <>
      <ColoursContextProvider>
        <BrowserRouter>
          <nav>
            <NavLink to="/todo">HOME</NavLink>
            <NavLink to="/todo/add">ADD TODO</NavLink>
          </nav>
          <Routes>
            <Route path="/todo" element={<TodoIndex />} />
            <Route path="/todo/add" element={<AddTodoPage />} />
          </Routes>
        </BrowserRouter>
      </ColoursContextProvider>
    </>
  );
}

export default App;
