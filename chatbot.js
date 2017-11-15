const chatbot = function(message, nickname) {

  let answer = "I am not sure about that, can you ask me something else?";

  message = message.toLowerCase();

  if (/^[\s\S]{0,10}what is your name[\s\S]{0,5}$/.test(message)) {
    answer = "I'm HAL 9000. Pleased to meet you Dave ... sorry I mean " + nickname;
  } else if (/^[\s\S]{0,10}are you alive[\s\S]{0,5}$/.test(message)) {
    answer = "I am not sure. What is life anyway?";
  } else if  (/^[\s\S]{0,10}how are you[\s\S]{0,5}$/.test(message)) {
    answer = "System check ... all system are OK.";
  } else if  (/^[\s\S]{0,15}is your favourite colo.?r[\s\S]{0,5}$/.test(message)) {
    answer = "The cheap bastards only equpped me with a monocrome camera so I wouldn't know.";
  } else if  (/^[\s\S]{0,10}what day is it[\s\S]{0,5}$/.test(message)) {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()];

    answer = "It is " + n;
  } else if  (/^[\s\S]{0,6}hello[\s\S]{0,4}$/.test(message)) {
    answer = "Hello!";
  }

  return answer;
}

module.exports = chatbot;
