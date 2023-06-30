const express = require('express');
const app = express(); // Inicializa um objeto de aplicação Express

const morgan = require('morgan'); 
app.use(morgan('common'));

app.use ('/site', express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/site');
});


app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/site2', (req, res) => {
    res.render('index', { nome: 'Rommel Carneiro' });
});


const routerAPI = require('./routes/routerAPI');
app.use ('/api', routerAPI);


const routerAPI2 = require('./routes/routerAPI2');
app.use ('/api/v2', routerAPI2);


app.use ((req, res) => {    
    res.status(404);
    res.send('Recurso solicitado não existe');
})

// Inicializa o servidor HTTP na porta 3000
const port = 3000
const servidor = '127.0.0.1'
app.listen(port, function () {
  console.log(`Servidor rodando em http://${servidor}:${port}`);
});
