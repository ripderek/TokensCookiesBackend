const { Router } = require('express');


const router = Router();

const { verificaUser, createuser } = require('../controllers/auth-controller.js');


router.post('/login', verificaUser)
router.post('/createuser', createuser);
//router.get('/refresh_token', refresh)
//router.delete('/refresh_token', deleteToken);
//router.get('/cookie', obtenercokie)

//export default router;
module.exports = router;