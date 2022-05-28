const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello TOTO!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/ma-super-route/', (req, res) => { // pour créer une route entre / je mets le nom de la route /ma-super-route/ que j'ai inventée (pour aller sur une page)
    res.send('Hello Super!') //contenu de la page qui sera mis en json
  })

  app.get('/sauces/', (req, res) => { // pour créer une route entre / je mets le nom de la route /sauces/ que j'ai inventée (pour aller sur une page)
    res.send('Array of sauces') //contenu de la page qui sera mis en json
  })

  app.get('/sauces/:id/', (req, res) => { // pour créer une route entre / je mets le nom de la route /sauces/:id/ que j'ai inventée (pour aller sur une page)
    res.send('Single sauce') //contenu de la page qui sera mis en json
  })