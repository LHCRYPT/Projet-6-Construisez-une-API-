const express = require('express'); //on importe express avec une constante

const app = express(); //création de notre appli avec express

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



/*app.use((req, res, next) => { //fonct middleware dans une app express qui reçoit req/rep et les gère+ les envoie (next)à à la prochaine fonct middleware
   console.log('Requête reçue !'); 
   next(); //pour renvoyer vers le prochain middleware
});*/

/*app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
 });*/



 
  /*app.listen(port, () => { //le serveur doit attendre les requêtes envoyées
    console.log(`Example app listening on port ${port}`)
  })
  */
  
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
  
    app.use((req, res, next) => { //middleware
      console.log('Reponse envoyée avec succès !');
      });


module.exports = app; //on exporte cette appli/constante pour pouvoir y accéder depuis les autres fichiers de notre projet comme le serveur node



