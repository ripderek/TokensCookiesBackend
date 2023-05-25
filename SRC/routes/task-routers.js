const { Router } = require('express');
const router = Router();
const { allrows, createtask, updatetask, deletetask, taskdetails, imagen, pdf, word } = require('../controllers/task-controller');


//index
router.get('/', allrows);
router.post('/crear', createtask)

//para estas se envian el id por parametro
router.put('/edit/:id', updatetask);
router.delete('/detele/:id', deletetask);
router.get('/details/:id', taskdetails);
router.get('/img', imagen);
router.get('/pdf', pdf);
router.get('/word', word);





module.exports = router;