const express = require('express');
const { routes } = require('../app');
const router = express.Router();

//Retorna todos os pedidos
router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem: "Retorna os pedidos!"
    });
});

// INSERE UM PEDIDO
router.post('/',(req,res,next)=>{
    const pedido ={
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }

    res.status(201).send({
        mensagem: "Pedido foi criado",
        pedidoCriado: pedido
    });
});

//RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido',(req,res, next) =>{
    const id = req.params.id_pedido

    res.status(200).send({
        mensagem: "Detalhes do Pedido ",
        id_pedido: id
    })
    
});


//EXCLUI UM PEDIDOS
router.delete('/',(req,res,next)=>{
    res.status(201).send({
        mensagem: "PEDIDO EXCLUÍDO!"
    });
});

module.exports = router;