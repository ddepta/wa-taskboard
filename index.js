/**
 * @author Nico Merkel
 * @version 1.0.0 
 * @description
 */

const SocketHandler = require('./core/socket.js');

const express = require('express');
const app     = express();
const http    = require('http').createServer(app);
const io      = require('socket.io')();

io.attach(http);


global.cfg = require('./config/config.js');


const bodyParser= require('body-Parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/assets', express.static('assets'));

const database = require('./core/database.js')();
const socket = new SocketHandler(io,database);
app.ioHandler = socket;

 const routes = require('./config/routes.js');
 const Router = require('./core/router.js');
 const router = new Router(app, routes,database);
 router.setup();

 app.get('/', (req,res) => {
    res.send('Hello World');
 })

 http.listen(3000,function(){
    console.log('App listening at http://localhost:3000');
 });




