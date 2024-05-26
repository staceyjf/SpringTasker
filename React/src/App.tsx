import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import ColoursContextProvider from "./context/ColourContextProvider";
import TodoIndex from "./pages/TodoIndex/TodoIndex";
import AddTodoPage from "./pages/AddTodoPage/AddTodoPage";
import UpdateTodoPage from "./pages/UpdateTodoPage/UpdateTodoPage";
import "./App.scss";

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
            <Route path="/todo/edit/:id" element={<UpdateTodoPage />} />
          </Routes>
        </BrowserRouter>
      </ColoursContextProvider>
    </>
  );
}

export default App;
