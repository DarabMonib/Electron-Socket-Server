var app = require('express')();
var socket = require('socket.io');
var cors = require('cors');

app.get('/', (req, res) => res.send(200))
var server = app.listen(process.env.PORT || 4000, () => console.log(`port => 4000`));
let invitation = {
    send: false,
    accept: false
};

app.use(cors());

var io = socket(server);
io.on('connection', (socket) => {

    let xi = 0;
    console.log('A new user just connected!')

    socket.on('todo', (data) => {
        io.emit('todo', data);
    })
    socket.on('typing', (data) => {
        io.emit('typing', data);
    })
    socket.on('stopped', (data) => {
        io.emit('stopped', data);
    })
    socket.on('video', (data) => {
        io.emit('video', data);
    })
    socket.on('codeChange', (codeVal) => {
        console.log('change!' + xi++, codeVal)
        // socket.to().emit('codeChange', codeVal);
        socket.broadcast.emit('codeChange', codeVal);
    })
    
    socket.on('invitation', (state) => {
        
        if(state == 'send'){
            invitation.send = true;
        }
        if(invitation.send && state == 'accept'){
            invitation.accept = true;

            if(invitation.send && invitation.accept){
                io.emit('invitation', 'open code');
                invitation.send = false
                invitation.accept = false
            }

        }

    })

    

});