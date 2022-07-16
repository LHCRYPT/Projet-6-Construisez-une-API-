const express = require('express');
const router = express.Router(); //on créé le routeur avec la méthode routeur d'express

const auth = require('../middleware/auth'); //pour importer ce middleware dans notre routeur
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff'); //on importe stuff de controllers avec stuffCtrl


router.get('/', auth, stuffCtrl.getAllThings);//pour récupérer toutes les choses
router.post('/', auth, multer, stuffCtrl.createThing); //Dans notre routeur stuff, nous importons notre middleware et le passons comme argument aux routes à protéger
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing); //on met multer pour pouvoir modifier des objets
router.delete('/:id', auth, stuffCtrl.deleteThing);



module.exports = router; //on réexporte le routeur de ce fichier là
