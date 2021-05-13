const exprees = require('express');
const app = exprees();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos'); 

app.use(morgan('dev')); //monitora todas rotas abaixo 
app.use(bodyParser.urlencoded({extended: false})); //apenas dados simples
app.use(bodyParser.json()); //json de entrada

//define as permissoes 
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type,Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATH, DELETE, GET');
        return res.status(200).send({})
    }

    next();
});

app.use('/produtos', rotaProdutos);
app.use('/pedidos',rotaPedidos);

//Quando não encontra uma rota
app.use((req,res,next)=>{
    const erro = new Error("Não encontrado")
    erro.status = 404;
    next(erro);
});

//Tratamento para qualquer tipo de erro 
app.use((error, req, res, next)=>{
    res.status(error.status || 500);

    return res.send({
        erro:{
            mensagem: error.message
        }
    });
});



module.exports = app;