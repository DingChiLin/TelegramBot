const _ = require('lodash');
const Bot = require('node-telegram-bot-api');
const moment = require('moment-timezone');
const stickers = require('./stickers.js')
const token = process.env.TOKEN;

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

  if (resp == '/test') {
    bot.sendMessage(chatId, '晚安');
  }

  if (resp == '/misschichi') {
    m = moment().tz('Asia/Taipei');
    date = m.format('YYYY-MM-DD');
    hour = m.format('HH');
    const message = secretMessage(date, hour)
    bot.sendMessage(chatId, message);

    const stickers = stickerMessage(message);
    stickers.forEach( sticker => {
      if (sticker != '') {
        bot.sendSticker(chatId, sticker);
      }
    })

  }

  if (resp == '/help') {
    bot.sendMessage(chatId, "呆呆：貼圖表!\n\n" + _.keys(stickers).join("\n"));
  }

  if (resp.includes('前任') || resp.includes('前女友')) {
    bot.sendMessage(chatId, '不要講前任啦～');
  }

  const stickers = stickerMessage(resp);
  stickers.forEach( sticker => {
    if (sticker != '') {
      bot.sendSticker(chatId, sticker);
    }
  })

});

function stickerMessage(resp) {
  var stickerMessages = [];
  _.forEach(stickers, function(sticker, key) {
    if(resp.includes(key)){
      if (_.isArray(sticker)) {
        const type = sticker[0];
        const stickerContent = sticker.slice(1);
        if (type == 's') {
          stickerContent.forEach( s => {
            stickerMessages.push(s)
          })
        } else if (type == 'r') {
          const index = getRandomInt(stickerContent.length);
          stickerMessages = [stickerContent[index]]
        }
      } else {
        stickerMessages = [sticker];
      }
    }
  })
  return stickerMessages
}

function secretMessage(date, hour) {
  console.log(date);
  console.log(hour);
/*
  var messages = [''];
  if (date == '2019-02-11' && hour == 12) {
    return 'ya it is work';
  } else {
    return '';
  }
*/
  if (hour >= 23 || hour <= 8) {
    messages = ['zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz',
      '被發現了！']
  } else if (hour >= 8 && hour <= 9) {
    messages = ['寶貝早安']
  } else if (hour >= 22) {
    messages = ['寶貝晚安～', '早點睡覺！', '啾啾'];
  } else {
    switch(date) {
      case '2019-02-21':
        messages = ['內觀第一天，希望寶貝過得很好', '趁機騷你癢耶耶', '哇啦哇啦', '寶貝～'];
        break;

      case '2019-02-22':
        messages = ['還是不習慣四點起床，想睡覺', '腳麻了～踢踢', '滾來滾去', '今天還好嗎？'];
        break;

      case '2019-02-23':
        messages = ['今天上班辛苦了QQ', '寶貝加油', '呆呆愛媽咪', '走來走去', '摸摸頭'];
        break;

      case '2019-02-24':
        messages = ['寶貝放假好好休息噢', '走來走去', '今天'];
        break;

      case '2019-02-25':
        messages = [''];
        break;

      case '2019-02-26':
        messages = [''];
        break;

      case '2019-02-27':
        messages = [''];
        break;

      case '2019-02-28':
        messages = [''];
        break;

      case '2019-03-01':
        messages = [''];
        break;

      case '2019-03-02':
        messages = ['最後一天靜坐了！！', '想吃好料', '想吃你', '啾啾'];
        break;

      case '2019-03-03':
        messages = ['準備出關囉～～等我', '想親親的人', '跳來跳去']
        break;

      default:
        messages = '想你～';
    }
  }

  const index = getRandomInt(messages.length);
  const secretMessage = messages[index]
  console.log(index)
  console.log(messages[index])

  return secretMessage;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = bot;
