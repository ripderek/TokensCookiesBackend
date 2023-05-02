const pool = require('../db');

const allrows = async (req, res, next) => {
    try {
        // throw new Error('Algo paso xd sexo '); para verificar si el next funciona y envia el error al index
        const result = await pool.query('select * from Users', (error, results) => {
            if (error) {
                throw error;
            }
            else {
                res.json(results.rows);
            }
        })
        // res.json({ mesage: "Hola usuario" });
    } catch (error) {
        next(error);//Aqui se envia el error al index.js
    }
}

module.exports = {
    allrows
};
