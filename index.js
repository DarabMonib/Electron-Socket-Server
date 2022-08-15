var express = require('express');
var socket = require('socket.io');
var cors = require('cors');

// Add Mongo Connection..
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://darab:QZQ3BmmE0nDjhKCE@cluster0.q8vwrhr.mongodb.net/?retryWrites=true&w=majority');

//Model...
const Todo = mongoose.model('Todo', { todo: String, author: String });

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(cors());

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('A User Connected!🎉', socket.id.substr(0,2));

    // Handle chat event
    // socket.on('test', (data) => {
    //     io.emit('test', data);
    // });

    socket.on('todo', (data) => {

        // 1. Post Data to mongo!... 
        // 2. Send All new Data to the client side!..

        // Saving to mongo!
        // const todoItem = new Todo({ todo: item.todo, author: item.author });
        // todoItem.save().then(() => {
        //     console.log('item saved on mongo as well...')

        // });
        console.log('data came here!...')
        console.log(data)
        io.emit('todo', data);

    })


});