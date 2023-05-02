//se importa este modulo de react para las rutas
//El useParams es para obtener los parametros por la url
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Deletetask from "./deletetask";

function Createtask() {
  //se guarda la funcion navigate en una constante
  const navigate = useNavigate();
  //Obtener los parametros
  const params = useParams();
  const [task, setTak] = useState({
    idu: "",
    nombreprueba: "",
  });

  //Almanecar en un objeto los parametros
  const HandleChange = (e) => {
    setTak({ ...task, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //crear un estado para mostrar cuando la conexion es lerda xd x
  const [loading, setLoading] = useState(false);

  //crear un estado para saber si va a editar o crear
  const [edit, setEdit] = useState(false);

  //crear una funcion que tome los datos de una tarea si se va a editar para mostrarlos en los input
  const loadtask = async (id) => {
    const res = await fetch("http://localhost:4000/details/" + id);
    const data = await res.json();
    setTak({ idu: data.id, nombreprueba: data.nombreprueba });
    setEdit(true);
  };

  //Para verificar si el registro se se quiere editar o crear
  useEffect(() => {
    if (params.id) {
      loadtask(params.id);
    }
  }, [params.id]);

  //Enviar para que guarde la API
  const HandleSUbumit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //si edit es true entonces editar de lo contrario crear
    if (edit) {
      await fetch("http://localhost:4000/edit/" + params.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
    } else {
      await fetch("http://localhost:4000/crear", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
    }

    setLoading(false);
    navigate("/");
  };

  //IMPORTANTE
  //LOS NAMES DE LOS INPUT Y DE LOS OBJETOS TIENEN QUE IR CON EL MISMO NOMBRE QUE PIDE LA API EN LOS CONTROLLERS XD
  return (
    <div>
      <h1> Crear Registro xd</h1>
      <form onSubmit={HandleSUbumit}>
        <a className="bg-red-500 cursor-pointer " onClick={() => navigate("/")}>
          Regresar al inicio
        </a>
        <input
          type="text"
          placeholder="id"
          className="border-slate-800 border-solid border-2 mr-3 ml-3"
          onChange={HandleChange}
          name="idu"
          id="idu"
          value={task.idu}
        />
        <input
          type="text"
          placeholder="nombre"
          className="border-slate-800 border-solid border-2 mr-3 ml-3"
          onChange={HandleChange}
          name="nombreprueba"
          value={task.nombreprueba}
        />
        <button
          type="submit"
          className="bg-slate-500 text-white p-2"
          disabled={!task.idu || !task.nombreprueba}
        >
          {loading ? "Cargando.." : "Guardar"}
        </button>
        <Deletetask edit={edit} id={params.id} />
      </form>
    </div>
  );
}

export default Createtask;
