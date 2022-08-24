const express = require('express');
const router = express.Router(); //on créé le routeur avec la méthode routeur d'express

const auth = require('../middleware/auth'); //pour importer ce middleware dans notre routeur
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce'); //on importe stuff de controllers avec stuffCtrl


router.get('/', auth, sauceCtrl.getAllSauces);//pour récupérer toutes les choses
router.post('/', multer, auth,sauceCtrl.createSauce); //Dans notre routeur stuff, nous importons notre middleware et le passons comme argument aux routes à protéger
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce); //on met multer pour pouvoir modifier des objets
router.delete('/:id', auth, sauceCtrl.deleteSauce);

router.post('/:id/like', auth, sauceCtrl.userLikeSauce);

module.exports = router; //on réexporte le routeur de ce fichier là
