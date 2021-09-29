var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./app/routes/index');
var pedidoRouter = require('./app/routes/pedido');
var produtoRouter = require('./app/routes/produto');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pedido', pedidoRouter);
app.use('/produto', produtoRouter);

module.exports = app;