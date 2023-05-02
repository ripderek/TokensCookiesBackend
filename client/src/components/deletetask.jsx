import React from "react";
import { useNavigate } from "react-router-dom";

function Deletetask({ edit, id }) {
  //se guarda la funcion navigate en una constante
  const navigate = useNavigate();

  const eliminar = async () => {
    await fetch("http://localhost:4000/detele/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    navigate("/");
  };
  if (edit) {
    return (
      <>
        <button
          className="bg-red-600 ml-2 text-white p-2"
          onClick={() => eliminar()}
        >
          Eliminar
        </button>
        <div>eliminar tarea {id}</div>
      </>
    );
  }
  return <div>crear tarea</div>;
}
export default Deletetask;
