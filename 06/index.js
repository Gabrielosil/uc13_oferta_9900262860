const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');

const app = express();

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middleware para processar dados de formulário
app.use(express.urlencoded({
    extended: true,
}));

// Middleware para processar JSON
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota principal (home)
app.get('/', function (req, res) {
    res.render('home');
});

// Rota para inserir um novo livro
app.post('/books/insertbook', function (req, res) {
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`;

    conn.query(query, function (err) {
        if (err) {
            console.log(err);
            // Em um ambiente de produção, você deve renderizar uma página de erro ou enviar uma resposta JSON de erro
        }

        res.redirect('/');
    });
});

// Rota para listar todos os livros
app.get('/books', function (req, res) {
    const query = `SELECT * FROM books`;

    conn.query(query, function (err, data) {
        if (err) {
            console.log(err);
        }

        const books = data;

        console.log(data); // Para depuração

        res.render('books', { books });
    });
});

// Rota para exibir detalhes de um livro específico
app.get('/books/:id', function (req, res) {
    const id = req.params.id;

    const query = `SELECT * FROM books WHERE id = ${id}`;

    conn.query(query, function (err, data) {
        if (err) {
            console.log(err);
        }

        const book = data[0]; // Pega o primeiro resultado (o livro com o ID)

        console.log(data[0]); // Para depuração

        res.render('book', { book });
    });
});

// Rota para a página de edição de livro
app.get('/books/edit/:id', function (req, res) {
    const id = req.params.id;

    const query = `SELECT * FROM books WHERE id = ${id}`;

    conn.query(query, function (err, data) {
        if (err) {
            console.log(err);
        }

        const book = data[0]; // Pega o livro para edição

        console.log(data[0]); // Para depuração

        res.render('editbook', { book });
    });
});

// Rota para atualizar um livro existente
app.post('/books/updatebook', function (req, res) {
    const id = req.body.id;
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const query = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE id = ${id}`;

    conn.query(query, function (err) {
        if (err) {
            console.log(err);
        }

        res.redirect(`/books/edit/${id}`); // Redireciona de volta para a página de edição do livro
    });
});

// Rota para remover um livro
app.post('/books/remove/:id', function (req, res) {
    const id = req.params.id;

    const query = `DELETE FROM books WHERE id = ${id}`;

    conn.query(query, function (err) {
        if (err) {
            console.log(err);
        }

        res.redirect(`/books`); // Redireciona para a lista de livros
    });
});

// Configuração da conexão com o banco de dados MySQL
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql',
});

// Conecta ao MySQL e inicia o servidor Express
conn.connect(function (err) {
    if (err) {
        console.log(err);
        return; // É importante sair se a conexão com o DB falhar
    }

    console.log('Conectado ao MySQL!');

    app.listen(3000, () => {
        console.log('Servidor Express rodando na porta 3000!');
    });
});
