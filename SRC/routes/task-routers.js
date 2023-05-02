const { Router } = require('express');
const router = Router();
const { allrows, createtask, updatetask, deletetask, taskdetails } = require('../controllers/task-controller');


//index
router.get('/', allrows);
router.post('/crear', createtask)

//para estas se envian el id por parametro
router.put('/edit/:id', updatetask);
router.delete('/detele/:id', deletetask);
router.get('/details/:id', taskdetails);


module.exports = router;