import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const HandleSUbumit = async (e) => {
    e.preventDefault();
    console.log("asd");
    //setLoading(true);
    /*
    const result = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }); */
    const result = await axios.post(
      "http://localhost:4000/api/auth/login",
      user,
      { withCredentials: true }
    );
    //res.setHeader("Set-Cookie", serialized);
    //console.log(response);
    const cookies = new Cookies();
    cookies.set("myTokenName", result.data, { path: "/" }); //enviar cokiee y almacenarla
    //para usar la cookie cookies.get('nombrecookie')
    console.log("sexo");
    console.log(result.data);
    console.log(user);
  };

  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  return (
    <div>
      <h1> Login </h1>
      <form onSubmit={HandleSUbumit}>
        <input
          type="text"
          placeholder="email"
          className="border-slate-800 border-solid border-2 mr-3 ml-3"
          onChange={HandleChange}
          name="email"
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className="border-slate-800 border-solid border-2 mr-3 ml-3"
          onChange={HandleChange}
          name="password"
        />
        <button type="submit" className="bg-slate-500 text-white p-2">
          Iniciar Sesion
        </button>
      </form>
    </div>
  );
}

export default Login;
