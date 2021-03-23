# twitch_translate_bot

Simple example of a translation bot for Twitch
Uses google translate througe googletrans npm package. It doesn't require a key, but it has some limitations. And you can easily adapt the script to use another API, eventually with your own API key.

# Requirements
In order to use this script you must
* Create a Twitch channel for your bot. The name of th ebot will be the name of the channel and cannot be changed
* Generate a key for authenticating your bot, using the Twitch Chat OAuth Password Generator: https://twitchapps.com/tmi/

# Setup
You only need to install npm packages and run the script, by executing these commands in the folder where you have stored your copy of `bot.js` script. You'll need to set CHANNEL_NAME and CHANNEL_PASSWORD environment variables to node - you also can directly modify the script

```
npm install
CHANNEL_NAME=mybotchannel CHANNEL_PASSWORD=xxxxxx node ./bot.js
```

# Commands

- !lang : displays basic information about the feature.

Language related commands:

- `!cn` : Translate to Simplified Chinese    
- `!en` : Translate to English
- `!fi` : Translate to Finnish    
- `!fr` : Translate to French
- `!de` or `!ge` : Translate to German    
- `!it` : Translate to Italian
- `!jp` : Translate to Japanese
- `!ko` : Translate to Korean
- `!pl` : Translate to Polish
- `!pt` or `!br` : Translate to Portuguese
- `!ro` : Translate to Romanian   
- `!tu` : Translate to Turkish
- `!ru` : Translate to Russian

For example: `!pt Hello friends!`

Emoticons should be avoided as they will disturb the bot (and it won't probably be able to display them). Also  mixing different languages in your sentence shoudl be avoid.
