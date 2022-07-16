const express = require('express'); //on importe express avec une constante

const app = express(); //création de notre appli avec express
const mongoose = require('mongoose');

const Thing = require('./models/thing');


mongoose.connect('mongodb+srv://toto:56_cPy-3@cluster0.m8xxyhv.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); //pareil que bodyparser

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

  /*
    app.get('/sauces', (req, res, next) => { // pour créer une route entre / je mets le nom de la route /sauces/ que j'ai inventée (pour aller sur une page)
      res.send('Array of sauces') //contenu de la page qui sera mis en json
      next(); //pour aller au prochain middleware
    })
  
    app.get('/sauces/:id', (req, res, next) => { 
      res.send('Single sauce') 
      next(); //pour aller au prochain middleware
    })
  
    app.post('/auth/signup', (req, res, next) => { 
           res.send('lo ') 
           next(); //pour aller au prochain middleware
    })
  
    app.post('/auth/login', (req, res, next) => { 
      let email =req.body.email;
      console.log (email);
      res.send('lo '+email) 
      next(); //pour aller au prochain middleware
    })
  
    app.post('/sauces', (req, res, next) => { 
      res.send('Verb') 
      next(); //pour aller au prochain middleware
    })
  
    app.put('/sauces/:id ', (req, res, next) => { 
      res.send('message: String') 
      next(); //pour aller au prochain middleware
    })
  
    app.delete('/sauces/:id ', (req, res, next) => { 
      res.send('message: String') 
      next(); //pour aller au prochain middleware
    })
  
    app.post('/sauces/:id/like', (req, res, next) => { 
      res.send('message: String') 
      next(); //pour aller au prochain middleware
    })
  */
    app.use((req, res, next) => { //middleware
      console.log('Reponse envoyée avec succès !');
      });


module.exports = app; //on exporte cette appli/constante pour pouvoir y accéder depuis les autres fichiers de notre projet comme le serveur node



