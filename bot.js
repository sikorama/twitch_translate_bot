// Translator Bot for Twitch
// Using google translate, via 'googletrans' package

// API Twitch
const tmi = require('tmi.js');
// API Google Translate
const gtrans = require('googletrans').default;

// Define configuration options here
// - username is the name of the channel/bot
// - password is generated on https://twitchapps.com/tmi/ page
// - channels is an array of channels
// - connection: defines additional options
//
// username and password are defined after CHANNEL_NAME and CHANNEL_PASSWORD environment variables
// (you also can overwrite botname and botpassword here)
let botname = process.env.CHANNEL_NAME;
let botpassword = process.env.CHANNEL_PASSWORD;
// TODO: If no channel & password, then exit...
if ((botname == undefined) || (botpassword == undefined)) {
  console.error('No CHANNEL_NAME or CHANNEL_PASSWORD environment variable found. Exiting.');
  process.exit(-1);
}
// add oauth: before botpassword
botpassword = 'oauth:' + botpassword;

const opts = {
  identity: {
    username: botname,
    password: botpassword
  },
  channels: [
    // using bot's channel is great for testing, but not mandatory
    botname
    //more channels
  ],
  // Automatic reconnection
  connection: { reconnect: true }
};
// Create a client with our options
const client = new tmi.client(opts);

const tr_lang = {
  'de': ['de', 'sagt'],
  'en': ['en', 'says'],
  'fr': ['fr', 'dit'],
  'pt': ['pt', 'disse'],
};

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  try {

    // Ignore messages from the bot
    if (self) { return; }

    // Remove whitespace from chat message
    let tMsg = msg.trim();

    // Check if the message starts with @name
    // in that case, extract the name and move the @name at the end of the message, and process
    if (tMsg[0] === '@') {
      let atnameEndIndex = tMsg.indexOf(' ');
      let atname = tMsg.substring(0, atnameEndIndex);
      let msg = tMsg.substring(atnameEndIndex + 1);
      tMsg = msg + ' ' + atname;
      console.info('Changed message :', tMsg);
    }

    // Filter commands (options)
    if (tMsg[0] != '!') return;

    // Extract command
    let cmd = tMsg.split(' ')[0].substring(1).toLowerCase();

    // Name for answering
    let answername = '@' + context['display-name'];

    // Command for displaying the commands (in english)
    if (cmd === "lang" || cmd === "translate") {
      client.say(target, 'I can (approximatevely) translate your messages in many languages. Simply start your message with one of these commands: !en (english) !fr (french)  !de (german) !pt (portuguese)... ');
      return;
    }

    // Commands for displaying messages explaining the translation feature in various languages
    // TODO: sentences
    const explanations = {
      //    'germans': '',
      //    'spanish': '',
      'french': 'Vous pouvez utiliser notre bot traducteur. Commencez votre message par !en pour traduire votre message en anglais. Par exemple "!en Bonjour"',
    }
    if (cmd in explanations) {
      client.say(target, explanations[cmd]);
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

        // Lazy mode, and english target => no translation, only displays 'lazy' message in english
        if ((lazy === true) && (ll[0].indexOf('en') == 0)) {
          say(target, context['display-name'] + ', ' + txt);
          return;
        }

        // Translate text
        gtrans(txt, { to: ll[0] }).then(res => {
          if (lazy === true) {
            // lazy mode sentence in english and also in requested language
            client.say(target, context['display-name'] + ', ' + txt + '/' + res.text);
          }
          else {
            // Translation
            // TODO: Check is translated text == original text. In that case it
            // means the command was not correctly used (ex: "!en hello friends")
            client.say(target, context['display-name'] + ' ' + ll[1] + ': ' + res.text);
          }
        }).catch(err => {
          console.error('Translation Error:', err);
        })
      }
    }
  }
  catch (e) {
    console.error(e.stack);
  }


}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
