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
/*
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
*/
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
  if (hour >= 23 || hour <= 7) {
    messages = ['zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz', 'zzzz',
      '被發現了！']
  } else if (hour >= 8 && hour <= 9) {
    messages = ['寶貝早安']
  } else if (hour >= 22) {
    messages = ['寶貝晚安～', '早點睡覺！', '睡前親一個啾啾'];
  } else {
    switch(date) {
      case '2019-02-21':
        messages = [
          '今天是內觀第一天，希望寶貝過得很好',
          '趁機騷你癢耶耶',
          '哇啦哇啦',
          '寶貝～',
        ];
        break;

      case '2019-02-22':
        messages = [
          '今天是內觀第二天，還是不習慣四點起床，想睡覺',
          '腳麻了～踢踢',
          '滾來滾去',
          '今天還好嗎？',
        ];
        break;

      case '2019-02-23':
        messages = [
          '今天是內觀第三天，希望你過的還好，晚上有好好睡覺嗎',
          '今天上班辛苦了QQ 寶貝加油',
          '呆呆愛媽咪',
          '摸摸頭',
        ];
        break;

      case '2019-02-24':
        messages = [
          '今天是內觀第四天，寶貝放假要好好休息噢',
          '棋棋在你身邊',
          '我在發呆，呆呆應該也是',
          '灰美在幹嘛～～',
        ];
        break;

      case '2019-02-25':
        messages = [
          '今天是內觀第五天，寶貝上班辛苦囉，我今天起課程會變難，要更集中精神了',
          '過完這個禮拜我就回來囉！等我！',
          '想抱抱的人',
          '打打鬧鬧',
        ];
        break;

      case '2019-02-26':
        messages = [
          '今天是內觀第六天，咻咻咻時間好快噢，已經過了一半囉，我剛學會隱形跟飛天，正在練眼睛發鐳射光',
          '棋棋愛你',
          '好想知道你在幹嘛噢～想抱你睡覺',
          '這裡沒有拉麵來補充水分 QQ',
        ];
        break;

      case '2019-02-27':
        messages = [
          '今天是內觀第七天，時間超過三分之二囉，要進入最累的一天了，今天要堅決靜坐，完全不能動，呆呆可能覺得很簡單',
          '你有唱棋棋之歌嗎，想聽',
          '棋棋想你',
          '呆呆跟灰美有沒有乖乖的～要聽媽咪的話',
        ];
        break;

      case '2019-02-28':
        messages = [
          '今天是內觀第八天',
          '',
          '',
          '',
        ];
        break;

      case '2019-03-01':
        messages = [
          '今天是內觀第九天',
          '',
          '',
          '',
        ];
        break;

      case '2019-03-02':
        messages = [
          '今天是內觀最後一天了！！，明天就要回去囉！，好想你噢',
          '想吃和牛、吃豬排、吃咖喱、吃你',
          '咬咬咬',
          '啾啾，你最棒了',
        ];
        break;

      case '2019-03-03':
        messages = [
          '準備出關囉～～等我',
          '想親親的人',
          '跳來跳去',
          '耶耶耶我要回來囉',
        ]
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
