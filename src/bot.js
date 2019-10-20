const _ = require('lodash');
const Bot = require('node-telegram-bot-api');
const moment = require('moment-timezone');
const schedule = require('node-schedule-tz');

const stickerMapping = require('../resources/stickers.js');
const token = process.env.TOKEN;

const {Client} = require('pg');

async function createTable(pg_config){
    client = new Client(pg_config);
    await client.connect();

    // Food
    await client.query(        `
        CREATE TABLE IF NOT EXISTS foods (
            id SERIAL PRIMARY KEY,
            date TIMESTAMP NOT NULL,
            food VARCHAR(100) NOT NULL,
            type integer NOT NULL,
            created_at TIMESTAMP NOT NULL
        );
    `)

    // Health
    await client.query(        `
        CREATE TABLE IF NOT EXISTS health (
            id SERIAL PRIMARY KEY,
            date TIMESTAMP NOT NULL,
            score integer NOT NULL,
            created_at TIMESTAMP NOT NULL
        );
    `)
    await client.end()
}

async function insertFoodData(pg_config, date, food, type){
    current_time = moment().tz('Asia/Taipei').format()
    client = new Client(pg_config);
    await client.connect();
    await client.query(`
        INSERT INTO foods (date, food, type, created_at) 
        VALUES('${date}', '${food}', '${type}', '${current_time}')
    `);
    await client.end();
}

async function getLatestHealthScore(pg_config){
    client = new Client(pg_config);
    await client.connect();
    result = await client.query(`
        SELECT score FROM health ORDER BY score DESC LIMIT 1 
    `);
    await client.end();
    if (_.isEmpty(result.rows)) {
        return 0
    } else {
        return result.rows[0].score
    }
}

async function addHealthScore(pg_config, date, score){
    current_time = moment().tz('Asia/Taipei').format()
    client = new Client(pg_config);
    await client.connect();
    await client.query(`
        INSERT INTO health (date, score, created_at) VALUES('${date}', '${score}', '${current_time}')
    `);
    await client.end();
}

const chatIds = {
    "TokageBot": '250655120',
    "OurGroup": '-231712129'
}
chatId = ""

let bot;
let pg_config;
console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
if (process.env.NODE_ENV === 'production') {
    pg_config = {
        user: "uwpfnrisnlsqie",
        password: "a50e5ce839b0be1853bc54aecc591972c613fe7cecab78679f3bc7491e2096e2",
        host: "ec2-107-22-222-161.compute-1.amazonaws.com",
        port: 5432,
        database: "ddg20htrjvjrtu"
    }
    createTable(pg_config)
    bot = new Bot(token);
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
    chatId = chatIds["OurGroup"]
}
else {
    pg_config = {
        user: "arthurlin",
        password: "1234",
        host: "localhost",
        port: 5432,
        database: "telegram"
    }
    createTable(pg_config)
    bot = new Bot(token, { polling: true });
    chatId = chatIds["TokageBot"]
}

// TODO: Let it ignore timezone (use UTC time and convert time according to local machine)
// 三餐吃什麼
var healthScore = 0
schedule.scheduleJob({ rule: '0 30 09 * * *' }, function () {
    date = moment().tz('Asia/Taipei').format('YYYY-MM-DD');
    bot.sendMessage(chatId, `[${date}] <code>爸比早餐吃什麼?</code>`, { "parse_mode": "HTML" })
});

schedule.scheduleJob('0 0 13 * * *', function () {
    date = moment().tz('Asia/Taipei').format('YYYY-MM-DD');
    bot.sendMessage(chatId, `[${date}] <code>爸比中餐吃什麼?</code>`, { "parse_mode": "HTML" })
});

schedule.scheduleJob('0 0 19 * * *', function () {
    date = moment().tz('Asia/Taipei').format('YYYY-MM-DD');
    bot.sendMessage(chatId, `[${date}] <code>爸比晚餐吃什麼?</code>`, { "parse_mode": "HTML" })
});

schedule.scheduleJob('10 0 19 * * *', function () {
    bot.sendMessage(chatId, "<code>爸比今天有吃健康嗎？ 記得一餐吃菜菜，還有不超過一餐油炸的喔～</code>", {
        "parse_mode": "HTML",
        "reply_markup": {
            "inline_keyboard": [[
                { text: "有做到！", callback_data: "true" },
                { text: "沒有QQ", callback_data: "false" }
            ]]
        }
    })
});

bot.on("callback_query", (callbackQuery) => {
    const result = callbackQuery.data;
    const msg = callbackQuery.message;
    if (result == "true") {
        healthScore += 1
        bot.answerCallbackQuery(callbackQuery.id)
            .then(() => {
                return getLatestHealthScore(pg_config)
            })
            .then((score) => {
                bot.sendMessage(msg.chat.id,
                    `<code>棒棒，健康加一分～累積 ${healthScore} 分囉</code>`,
                    { "parse_mode": "HTML" });
                return score;
            })
            .then((score) => {
                date = moment().tz('Asia/Taipei').format('YYYY-MM-DD')
                score += 1
                return addHealthScore(pg_config, date, score)
            })
            .catch(console.log)
    } else {
        bot.answerCallbackQuery(callbackQuery.id)
            .then(() => bot.sendMessage(msg.chat.id, "<code>沒關係，明天再加油！</code>", { "parse_mode": "HTML" }));
    }
});

// Reply message
bot.onText(/(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    if (resp == '/test') {
        console.log("test")
        m = moment().tz('Asia/Taipei');
        date = m.format('YYYY-MM-DD');
        // bot.sendMessage(chatId, `[${date}] <code>爸比晚餐吃什麼?</code>`, { "parse_mode": "HTML" })
        bot.sendMessage(chatId, "<code>爸比今天有吃健康嗎？ 記得一餐吃菜菜，還有不超過一餐油炸的喔～</code>", {
            "parse_mode": "HTML",
            "reply_markup": {
                "inline_keyboard": [[
                    { text: "有做到！", callback_data: "true" },
                    { text: "沒有QQ", callback_data: "false" }
                ]]
            }
        })
    }

    if (msg.reply_to_message &&
        msg.reply_to_message.from.username == "TokageBot" &&
        msg.reply_to_message.text.includes('爸比')) {
        reply_msg = msg.reply_to_message.text
        current_msgs = msg.text.split(' ')
        regex = /\[(.*?)\]/
        date = reply_msg.match(regex)[1]
        var meal_type = ""
        if (reply_msg.includes('早餐')) {
            meal_type = 1;
        } else if (reply_msg.includes('中餐')) {
            meal_type = 2;
        } else if (reply_msg.includes('晚餐')) {
            meal_type = 3;
        } else {
            console.log('Error, no keyword for meal type')
        }
        async function insert(){
            for (const food of current_msgs) {
                await insertFoodData(pg_config, date, food, meal_type);
            }
        }
        insert().catch(console.log)
    }

    if (resp.includes("想棋棋")) {
        m = moment().tz('Asia/Taipei');
        date = m.format('YYYY-MM-DD');
        hour = m.format('HH');
        const message = secretMessage(date, hour)
        bot.sendMessage(chatId, message);

        const stickers = stickerMessage(message, stickerMapping);
        stickers.forEach( sticker => {
            if (sticker != '') {
                bot.sendSticker(chatId, sticker);
            }
        })
    }

    if (resp.includes('前任') || resp.includes('前女友')) {
        bot.sendMessage(chatId, '不要講前任啦～');
    }

    const stickers = stickerMessage(resp, stickerMapping);
    stickers.forEach(sticker => {
        if (sticker != '') {
            bot.sendSticker(chatId, sticker);
        }
    })
});

function stickerMessage(resp, stickerMapping) {
    var stickers = [];
    _.forEach(stickerMapping, function (sticker, key) {
        if (resp.includes(key)) {
            console.log(resp)
            if (_.isArray(sticker)) {
                const type = sticker[0];
                const stickerContent = sticker.slice(1);
                if (type == 's') {
                    stickerContent.forEach(s => {
                        stickers.push(s)
                    })
                } else if (type == 'r') {
                    const index = getRandomInt(stickerContent.length);
                    stickers = [stickerContent[index]]
                }
            } else {
                stickers = [sticker];
            }
        }
    })
    return stickers
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
        switch (date) {
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
            ];
            break;

        case '2019-03-01':
            messages = [
                '今天是內觀第九天',
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
            messages = ['想你～'];
        }
    }

    const index = getRandomInt(messages.length);
    const secretMessage = messages[index]
    return secretMessage;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = bot;
