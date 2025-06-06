const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const basePath = path.join(__dirname, 'frontend')

app.use(express.urlencoded({ extended: true}))

app.use(express.json())
 
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
app.post('/users/save', (req, res) => {
    console.log(req.body)
    const name = req.body.name
    const age = req.body.age
    console.log(`Nome: ${name}, Idade: ${age}`)
});

app.get('/users/add', (req, res) => {
    console.log('Carregando formulério de usuário')
        res.sendFile(`${basePath}/userform.html`)
});
app.get('/users/:id', (req, res) => {
  console.log(`Carregando usuário: ${req.params.id}`)
 
  res.sendFile(`${basePath}/users.html`)
})
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})
app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})