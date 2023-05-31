const { dirname, extname, join } = require('path');
const { Router } = require('express');
const router = Router();
const { allrows, createtask, updatetask, deletetask, taskdetails, imagen, pdf, word, uploadfile } = require('../controllers/task-controller');
const multer = require('multer')
const MIMETYPES = ['image/jpeg', 'image/png'];
const upload = multer({
    storage: multer.diskStorage({
        destination: './archivos',
        filename: (req, file, cb) => {
            const fileExtension = extname(file.originalname);
            const fileName = file.originalname.split(fileExtension)[0];
            cb(null, `${fileName}-${Date.now()}${fileExtension}`);
        }
    }),

    fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes(file.mimetype)) cb(null, true)
        else cb(new Error('Only ' + MIMETYPES.join('') + 'son permitidos'))
    },
    limits: {
        fieldSize: 10000000,
    }
});

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
//colocar el mismo nombre en el middelwre con el que se envia el archivo xd 
router.post('/uploadfile', upload.single('file'), uploadfile);






module.exports = router;