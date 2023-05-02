import { BrowserRouter, Routes, Route } from "react-router-dom";
import Taklist from "./components/taklist";
import Edittaks from "./components/edittaks";
import Createtask from "./components/createtask";
import Login from "./components/login";
import Testcokiie from "./components/testcokiie";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/task" element={<Taklist />} />
        {/*cuando se quiera editar se envia hacia el formulario para crear con el parametro de la id */}
        <Route path="/edit/:id" element={<Createtask />} />
        <Route path="/create" element={<Createtask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Testcokiie />} />
      </Routes>
    </BrowserRouter>
  );
}
