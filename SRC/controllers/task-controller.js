//Se requiere la conexion a la bd porque desde aqui se usaran los query
const pool = require('../db');
const { verify } = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const allrows = async (req, res, next) => {
    try {
        // throw new Error('Algo paso xd'); para verificar si el next funciona y envia el error al index
        /*console.log(req.cookies);
        const { myTokenName } = req.cookies;
        try {
            const user = verify(myTokenName, 'SECRET') //EL SECRET TIENE QUE TOMARSE DESDE UN .ENV
            console.log(user);
        } catch (error) {
            return res.status(401).json({ error: "invalid token" })
        }
        */
        const result = await pool.query('select * from Prueba1', (error, results) => {
            if (error) {
                throw error;
            }
            else {
                res.json(results.rows);
            }
        })
    } catch (error) {
        next(error);//Aqui se envia el error al index.js
    }

}
//el next es un error personalizado que se envia al router
const createtask = async (req, res, next) => {
    const { idu, nombreprueba } = req.body;
    try {
        const result = await pool.query('Insert into prueba1 (id, nombreprueba) values ($1,$2) RETURNING*  ', [
            idu,
            nombreprueba
        ]);
        console.log(result.rows);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);//Aqui se envia el error al index.js
    }

}

//Editar registro que su id se envia por la URL es decir el req.params
const updatetask = async (req, res) => {
    const { id } = req.params;
    const { idu, nombreprueba } = req.body;
    const result = await pool.query('update prueba1 set id=$1, nombreprueba=$2 where ida=$3 RETURNING *', [
        idu,
        nombreprueba,
        id
    ]);
    //Si el resultado retornado tiene una longitud de 0 quiere decir que el id que se quiere editar no existe y devuelve un status 404 con un mensaje 
    if (result.rows.length === 0)
        return res.status(404).json({ message: "Task not found", });
    //si no exisitio errores retorna un json con el registro editado
    return res.json(result.rows[0]);
};
const deletetask = async (req, res) => {
    const { id } = req.params;

    const result = await pool.query('delete from prueba1 where ida=$1', [id]);

    //se usa rowcount y no lenght porque no retorna nada xd     
    if (result.rowCount === 0)
        return res.status(404).json({ message: "Task not found", });
    //si no exisitio errores retorna un json con el registro editado
    //no envia un json ni retorna el registro por que esta eliminado entonces envia un Estado 204 que significa que todo termino correctamente
    return res.sendStatus(204);
};
//obtener los datos de un solo registro
const taskdetails = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('select * from prueba1 where ida=$1', [id]);
    if (result.rows.length === 0) { return res.status(404).json({ message: "Task not found", }); }
    //si no exisitio errores retorna un json con el registro editado
    console.log(result.rows[0]);
    return res.json(result.rows[0]);

};
const imagen = async (req, res) => {

    let ext = path.extname("black-spiderman_2752x1548_xtrafondos.com.jpg");
    let fd = fs.createReadStream(path.join(__dirname, "../Assets/Wallpaper/", "black-spiderman_2752x1548_xtrafondos.com.jpg"));
    res.setHeader("Content-Type", "image/" + ext.substr(1));
    fd.pipe(res);

    //res.download('SRC/Assets/Wallpaper/Fri7zeuWIAA8Z7m.jpg'); para descargar xd 
}

const pdf = async (req, res) => {
    var data = fs.readFileSync('SRC/Assets/Wallpaper/CV_Raul_Coello_CV.pdf');
    res.contentType("application/pdf");
    res.send(data);
}

const word = async (req, res) => {
    //var data = fs.readFileSync('SRC/Assets/Wallpaper/Certificado.docx');
    //res.contentType("application/word");
    //res.send(data);
    res.download('SRC/Assets/Wallpaper/Certificado.docx');

}


//Se exportan los controladores en forma de objeto
module.exports = {
    allrows,
    createtask,
    updatetask,
    deletetask,
    taskdetails,
    imagen,
    pdf,
    word
};