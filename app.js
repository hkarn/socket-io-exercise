const port = 4000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const routes = require('./routes/routes.js');
const chatbot = require('./chatbot.js');

/* --DEV--
const logger = require('morgan');
app.use(logger('dev'));
// --DEV-- */

app.use('/public', express.static('public'));
app.use('/', routes);

app.set('view engine', 'pug');

let userlist = ['bot']

io.on('connection', function (socket) {
  socket.emit('userlist', (userlist));

  socket.on('send-nickname', function (nickname) {
    userlist.push(nickname);
    socket.nickname = nickname;
    console.log('User logged on: ' + nickname);
    console.log('Sending updated user list to all users');
    io.emit('userlist', (userlist));
  });

  socket.on('disconnect', function () {
    console.log('User disconnected: ' + socket.nickname);
    userlist = userlist.filter(item => item !== socket.nickname);
    io.emit('userlist', (userlist));
    console.log('Sending updated user list to all users');
  });

  socket.on('message', function (message) {
    console.log(socket.nickname + " sent message:");
    console.log(message);

    //simple xss protection - stripping tags
    message = message.replace(/<\/?[^>]+(>|$)/g, "");

    io.emit('message', (socket.nickname + ": " + message));
    console.log('Broadcasting message.');
    if (/^[\s\S]?@bot[\s\S]*$/.test(message)) {
      console.log('This message is for the bot. Process answer.');
      let answer = chatbot(message, socket.nickname);
      io.emit('message', ("<span class='red'>bot: " + answer + '</span>'));
    }

  });

});


server.listen(port, () => {
  console.log('Listening on port: ' + port);
});
