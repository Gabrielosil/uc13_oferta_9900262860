const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
  partialsDir: ["views/partials/"],
});

app.use(express.static("public"));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  const user = {
    name: 'Gabriel',
    surname: 'Oliveira',
  };
  const approved = true;

  res.render('home', {
    user: user,
    auth: true,
    approved,
  });
});

app.get("/dashboard", function (req, res) {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboard", {
    items: items
  });
});

app.get("/blog", function (req, res) {
  const posts = [
    {
      title: "Aprender Node.js",
      category: "Node.js",
      body: "Node.js é muito utilizado na programação hoje em dia",
      comments: 4,
    },
    {
      title: "PHP ainda vale a pena?",
      category: "PHP",
      body: "PHP é uma linguagem robusta e madura para desenvolvimento web, com uma vasta comunidade e frameworks consolidados.",
      comments: 12,
    },
    {
      title: "Os segredos de JavaScript",
      category: "JavaScript",
      body: "JavaScript é a linguagem essencial para o desenvolvimento front-end e está ganhando cada vez mais espaço no back-end com Node.js.",
      comments: 5,
    },
  ];
  res.render("blog", { posts }); 
});

app.get("/post/:id", function (req, res) {
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