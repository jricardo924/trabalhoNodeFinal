const express = require('express');
const routerAPI2 = express.Router();

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);


// processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerAPI2.use(express.json());
routerAPI2.use(express.urlencoded({ extended: true }))

routerAPI2.get ('/produtos', (req, res) => {
    knex('produtos')
    .then((dados) =>{
        res.json (dados);
    }) 
    .catch((err) =>{
        res.json({message: `Erro o obter os produtos: ${err.message}`});
    })
});

routerAPI2.get ('/produtos/:id', (req, res) => {
    let id = req.params.id;
    knex('produtos').where('id', id)
    .then((dados) => {
        res.json (dados);
    })
    .catch((err) => {
        res.json({message: `Erro ao obter os produto: ${err.message}`});
    })    
});

routerAPI2.post('/produtos', (req, res) => {
    console.log (req.body);
    
    knex('produtos')
      .insert(req.body, ['id'])
      .then((dados) => {
            if (dados.length > 0) {
                const id = dados[0].id
                res.status(201).json( {
                    message: 'Produto adicionado com sucesso',
                    data: { id } });
            }
       })
    .catch((err) => {
        res.json({message: `Erro ao inserir produto: ${err.message}`});
    })    
});    

routerAPI2.put('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const produto = req.body;

    knex('produtos')
      .where('id', id)
      .update(produto)
      .then(() => {
        res.json({
          message: 'Produto atualizado com sucesso',
          data: { id }
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `Erro ao atualizar produto: ${err.message}`
        });
      });
});

routerAPI2.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;

    knex('produtos')
      .where('id', id)
      .del()
      .then(() => {
        res.json({
          message: 'Produto excluído com sucesso',
          data: { id }
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `Erro ao excluir produto: ${err.message}`
        });
      });
});


module.exports = routerAPI2;