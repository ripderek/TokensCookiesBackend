const { Router } = require('express');


const router = Router();
const { allrows } = require('../controllers/user-controller')

router.get('/', allrows);

module.exports = router;