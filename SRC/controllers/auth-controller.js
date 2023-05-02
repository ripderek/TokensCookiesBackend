const pool = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');

const verificaUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const users = await pool.query('SELECT * FROM USERS WHERE user_email = $1', [email]);
        if (users.rows.length === 0) return res.status(401).json({ error: "Email is incorrect" });
        const validpassword = await bcrypt.compare(password, users.rows[0].user_password);//aqui cambiar a contrasena
        if (!validpassword) return res.status(401).json({ error: "Password is incorrect" });
        //AQUI EL Web TOken dxdxdxd ajjaja saludos

        //let tokens = jwtTokens(users.rows[0]);
        //res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        //res.cookie('access_token', tokens.accessToken, { httpOnly: true });

        //res.json(tokens.accessToken);
        //const tokenprueba = localStorage.getItem('accessToken');
        //res.json({ tokens });
        //res.json(tokens);


        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: email,
            password: password
        }, 'SECRET') //el secret deberia estan en el .env

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })
        res.setHeader('Set-Cookie', serialized)
        console.log(serialized);
        return res.json(token);
    } catch (error) {
        next(error);//Aqui se envia el error al index.js
    }
}

const createuser = async (req, res, next) => {
    try {
        const { email, name } = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const users = await pool.query('insert into users (user_name, user_email, user_password) values ($1,$2,$3) RETURNING *', [name, email, hashedPassword]);
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

/*
const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (refreshToken === null) return res.status(401).json({ error: "Null refresh token" });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({ error: error.message });
            let tokens = jwtTokens(user);
            //{httpOnly: true, sameSite: 'none', secure: true}
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
            res.json(tokens);
        })
    } catch (error) {
        next(error);//Aqui se envia el error al index.js
    }
}

const deleteToken = async (req, res, next) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({ message: 'Refresh token deleted.' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

const obtenercokie = async (req, res, next) => {
    res.json(req.cookies);
}
*/

module.exports = {
    verificaUser, createuser
};
