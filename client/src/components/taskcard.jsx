//se importa este modulo de react para las rutas
import { useNavigate } from "react-router-dom";

function Taskcard({ task }) {
  //esta funcion envia como parametro en la url el id del registro que se desea editar
  const urledit = () => {
    navigate("/edit/" + task.ida);
  };
  //se guarda la funcion navigate en una constante
  const navigate = useNavigate();
  return (
    <div className="bg-zinc-900 text-black shadow-2xl ">
      <div className="mx-auto">
        <h1 className="text-lg font-bold text-white text-center mb-2 mt-4">
          {task.id}
        </h1>
        <p className="text-lg font-semibold text-gray-400  mb-2  ml-2">
          {task.nombreprueba}
        </p>
      </div>

      <div className="p-2 bg-white">
        <button
          className="bg-zinc-50 p-2 hover:bg-blue-700 rounded-md
        border-blue-700 border-2 border-solid"
          onClick={() => urledit()}
        >
          {task.ida}
        </button>
      </div>
    </div>
  );
}

export default Taskcard;
