const token = process.env.TOKEN;
const _ = require('lodash');
const stickers = require('./stickers.js')
const Bot = require('node-telegram-bot-api');
let bot;

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

bot.onText(/(.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  if (resp == '/help') {
    bot.sendMessage(chatId, "呆呆：貼圖表!\n\n" + _.keys(stickers).join("\n")  )
  }

  if (resp == '前任' || resp == '前女友') {
    bot.sendMessage(chatId, "幹你娘閉嘴")
  }

  _.forEach(stickers, function(sticker, key) {
    if(resp.includes(key)){
      if (_.isArray(sticker)) {
        const type = sticker[0]
        const stickerContent = sticker.slice(1)
        if (type == 's') {
          stickerContent.forEach( s => {
            bot.sendSticker(chatId, s);
          })
        } else if (type == 'r') {
          const index = getRandomInt(stickerContent.length)
          bot.sendSticker(chatId, stickerContent[index])
        }
      } else {
        bot.sendSticker(chatId, sticker);
      }
    }
  })
/*
  if (resp in stickers){
    const sticker = stickers[resp]
    if (_.isArray(sticker)) {
      const type = sticker[0]
      const stickerContent = sticker.slice(1)
      if (type == 's') {
        stickerContent.forEach( s => {
          bot.sendSticker(chatId, s);
        })
      } else if (type == 'r') {
        const index = getRandomInt(stickerContent.length)
        bot.sendSticker(chatId, stickerContent[index])
      }
    } else {
      bot.sendSticker(chatId, sticker);
    }
  }
*/
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

/*
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, 'Received your message');
  bot.sendSticker(chatId, 'CAADBQADUgADJZO8Fktt4y20_XaQAg');
});
*/
module.exports = bot;
