"use strict";

let socket = io.connect();

var nickname = "";
var message = "";


$('#nickname').keypress(function(e) {
  if(e.which == 13) {
    e.preventDefault();
    $(this).hide();
    $('#message').show();
    $('#chat').show();
    nickname = $(this).val();
    socket.emit('send-nickname', nickname);
    console.log("Nickname set to: " + nickname);
  }
});

$('#message').keypress(function(e) {
  if(e.which == 13 && !e.shiftKey) {
    e.preventDefault();
    message = $(this).val();
    $(this).val('');
    socket.emit ('message', message);
    console.log(nickname + " sent message: " + message);
  }
});

socket.on('userlist', (userlistin) => {
  var userlist = 'Logged in users: ';
  for (var i in userlistin){
    if (i != 0) {
      userlist = userlist + ', ';
    }
        userlist = userlist + '@' + userlistin[i];
    }
  $('#userlist').html(userlist);
});

socket.on('message', (messagein) => {
  console.log("New message: " + messagein);
  $('#chat').append('<p class="negative-indent">' + messagein.replace(/\n/g, "<br />") + '</p>');
});
