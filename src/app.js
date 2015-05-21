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
    var message = JSON.parse(event.data);
    card.title('Data from server');
    card.body(event.data);
    card.show();
    if (message.move == "forward")
    {
        Vibe.vibrate('double');            
    }
    else
    {
        Vibe.vibrate('long');            
    }  
};

var reg_message = {};
var registered_hand;

var main = new UI.Card({
  title: 'CYF',
  icon: 'images/menu_icon.png',
  subtitle: 'Which wrist?',
  body: 'Up=Left Down=Right'
});
main.show();

function send_registration_message() {
    var msg = {'register':registered_hand};
    ws.send(JSON.stringify(msg));
}

function send_unregistration_message() {
    var msg = {'unregister':registered_hand};
    ws.send(JSON.stringify(msg));
}

function unregister() {
    send_unregistration_message();
    registered_hand = null;
}

main.on('click', 'up', function(e) {
  var card = new UI.Card();
  card.title('I am Left.');
  registered_hand = 'left';
  send_registration_message();
    card.on('click', 'back', function(e) {
        unregister();
        card.hide();
    });
  card.body('Waiting for instructions...');
  card.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('I am Right');
  registered_hand = 'right';
  send_registration_message();
    card.on('click', 'back', function(e) {
        unregister();
        card.hide();
    });
  card.body('Waiting for instructions...');
  card.show();
});
