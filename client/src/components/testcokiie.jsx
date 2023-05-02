import React from "react";
import axios from "axios";

function Testcokiie() {
  const getCOkiie = async () => {
    const result = await axios.get("http://localhost:4000/api/taks", {
      withCredentials: true,
    });
    console.log(result);
  };
  return (
    <div>
      <button onClick={() => getCOkiie()}>cokiie test</button>
    </div>
  );
}

export default Testcokiie;
