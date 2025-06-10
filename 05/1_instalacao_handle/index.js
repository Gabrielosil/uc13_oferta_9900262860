const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
app.engine('handlebars', exphbs.engine());

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  const user = {
    name: 'Gabriel',
    surname: 'Oliveira',
  };

  const approved = false;

  res.render('home', {
    user: user,
    auth: true,
    approved
  });
});

app.get("/dashboard", function (req, res) {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboard", {
    items: items
  });
});

app.get("/post", function (req, res) {
  const post = {
    title: "Aprender Node.js",
    category: "Node.js",
    body: "Node.js é muito utilizado na programação hoje em dia",
    comments: 4,
  };

  res.render("blogpost", { post });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
