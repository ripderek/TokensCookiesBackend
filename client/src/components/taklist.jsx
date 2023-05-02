import { useEffect, useState } from "react";
import Taskcard from "./taskcard";
//se importa este modulo de react para las rutas
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Taklist() {
  //se guarda la funcion navigate en una constante
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState([]);

  const load = async () => {
    //const response = await fetch("http://localhost:4000/api/taks");
    const result = await axios
      .get("http://localhost:4000/api/taks/", {
        withCredentials: true,
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status === 401) {
            setError(true);
            navigate("/login");
          }
        }
      });

    //const data = await response.json();

    console.log(result);
    setTasks(result.data);
    //setTasks(data);
  };

  useEffect(() => {
    load();
  }, []);
  return (
    <div>
      <div className="container">
        <p className="mt-6 ml-14 text-4xl font-semibold">Listas</p>
        <button
          className="ml-14 bg-zinc-50 p-2 hover:bg-blue-700 rounded-md
        border-blue-700 border-2 border-solid"
          onClick={() => navigate("/create")} // aqui se envia al formulario de crear
        >
          Agregar
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 p-14">
        {tasks.map((task) => (
          <Taskcard key={task.ida} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Taklist;
