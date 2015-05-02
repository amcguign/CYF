/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');

var ws = new WebSocket('ws://cyf.joocy.com:5001');

ws.onmessage = function (event) {  
    var card = new UI.Card();
    card.title('Data from server');
    card.body(event.data);
    card.show();
    Vibe.vibrate('long');    
};

var reg_message = {};

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Which wrist?',
  body: 'Up=Left Down=Right'
});
main.show();

/*
main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});
*/

main.on('click', 'up', function(e) {
  var card = new UI.Card();
  card.title('I am Left.');
  reg_message.register = "left";  
  ws.send(JSON.stringify(reg_message));    
  card.body('Waiting for instructions...');
  card.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('I am Right');
  reg_message.register = "right";  
  ws.send(JSON.stringify(reg_message));
  card.body('Waiting for instructions...');
  card.show();
});
