# twitch_translate_bot
Simple example of a translation bot for Twitch
Uses google translate througe googletrans npm package. It doesn't require a key, but it has some limitations. And you can easily adapt the script to use another API, eventually with your own API key.

# Requirements
In order to use this script you must
* Create a Twitch channel for your bot. The name of th ebot will be the name of the channel and cannot be changed
* Generate a key for authenticating your bot, using the Twitch Chat OAuth Password Generator: https://twitchapps.com/tmi/

# Setup
Then you have to modify the script in order to use your channel+key, and simply install npm packages and run the script, by executing these commands in the folder where you have stored your copy of the `bot.js` script

```
npm install
node ./bot.js
```

