// Translator Bot for Twitch
// Using google translate, via 'googletrans' package

// API Twitch
const tmi = require('tmi.js');
// API Google Translate
const gtrans = require('googletrans').default;

// Define configuration options here
// username is the name of the channel/bot
// password is generated on XXXX page
// channels is an array of channels where the bot will go
const opts = {
  identity: {
    username: 'XXXXXXXXX',
    password: 'oauth:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  channels: [
    'sikorama'
  ]
};
// Create a client with our options
const client = new tmi.client(opts);

const tr_lang = {
  'de': ['de', 'hat gesagt'],
  'en': ['en', 'has said'],
  'fr': ['fr', 'a dit'],
  'pt': ['pt', 'disse'],
};

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  // Ignore messages from the bot
  if (self) { return; }

  // Remove whitespace from chat message
  var tMsg = msg.trim();
  // Filter commands (options)
  if (tMsg[0] != '!') return;

  // Extract command
  var cmd = tMsg.split(' ')[0].substring(1).toLowerCase();

  // Name for answering
  var answername = '@' + context['display-name'];

  // Command for displaying the commands
  if (cmd === "lang" || cmd === "translate") {
    client.say(target, 'I can (approximatevely) translate your messages in many languages. Simply start your message with one of these commands: !en (english) !fr (french)  !de (german) !pt (portuguese)... ');
    return;
  }

  if (cmd in tr_lang) {
    var ll = tr_lang[cmd];
    //console.error(ll);
    var txt = tMsg.substring(1 + cmd.length);

    // Text must be at least 2 characters and max 200 characters
    var lazy = false;
    if (txt.length > 2) {
      if (txt.length > 200) {
        lazy = true;
        txt = "i'm too lazy to translate long sentences ^^";
      }

      gtrans(txt, { to: ll[0] }).then(res => {
        if (lazy === true) {
          if (ll[0].indexOf('en') == 0) {
            client.say(target, context['display-name'] + ', ' + txt);
          }
          else
            client.say(target, context['display-name'] + ', ' + txt + '/' + res.text);
        }
        else
          client.say(target, context['display-name'] + ' ' + ll[1] + ': ' + res.text);
      }).catch(err => {
        console.error('Translation Error:', err);
      })
    }
  }

  // This command for logging
  if (tMsg === '!test') {
    console.log('* target = ', target); // Channel
    console.log('* context = ', context); // User info
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
