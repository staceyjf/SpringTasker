import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import TodoIndex from "./pages/TodoIndex/TodoIndex";
import "./App.scss";
import NewTodoFormPage from "./pages/NewTodoFormPage/NewTodoFormPage";
import ColoursContextProvider from "./context/ColourContextProvider";

function App() {
  return (
    <>
      <ColoursContextProvider>
        <BrowserRouter>
          <nav>
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/todo/new">ADD TODO</NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<TodoIndex />} />
            <Route path="/todo/new" element={<NewTodoFormPage />} />
          </Routes>
        </BrowserRouter>
      </ColoursContextProvider>
    </>
  );
}

export default App;
