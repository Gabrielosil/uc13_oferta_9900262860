const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const basePath = path.join(__dirname, 'templates')

const users = require('./users')
 
app.use(express.urlencoded({extended: true}))
 
app.use(express.json())
app.use(express.static("public"));
 
var checkAuth = function (req, res, next) {
  req.authStatus = true
  if (req.authStatus) {
    console.log('Está logado, pode continuar')
    next()
  } else {
    console.log('Não está logado, faça o login para continuar!')
  }
}
app.use(checkAuth)

app.use('/users', users)
 
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.use(function (req, res, next) {
  res.status(404).sendFile (`${basePath}/404.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
});