const { Telegraf } = require('telegraf');
const express = require("express");
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);
const WEBHOOK_URL = process.env.RENDER_EXTERNAL_URL;
const port = process.env.PORT || 3000;

const answers = [
    'Бесспорно',
    'Мне кажется — «да»',
    'Пока не ясно, попробуй позже',
    'Не стоит',
    'Да',
    'Предрешено',
    'Весьма сомнительно',
    'Даже не думай',
    'Перспективы не очень хорошие',
    'Мой ответ — «нет»'
];

bot.command('random', (msg) => {
    const chatId = msg.chat.id;
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    bot.telegram.sendMessage(chatId, randomAnswer);
});

bot.on('text', (msg) => {
    const chatId = msg.chat.id;
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    bot.telegram.sendMessage(chatId, randomAnswer, {
        reply_to_message_id: msg.message_id
    });
});

bot.on('sticker', (msg) => {
    const chatId = msg.chat.id;
    bot.telegram.sendMessage(chatId, 'Клевый стикер!', {
        reply_to_message_id: msg.message_id
    });
});

if (WEBHOOK_URL) {
    bot.telegram.setWebhook(${WEBHOOK_URL}/telegraf);
    app.use(bot.webhookCallback('/telegraf'));
    console.log(Webhook set to: ${WEBHOOK_URL}/telegraf);
} else {
    bot.launch();
    console.log('Using Long Polling');
}

app.get("/", (req, res) => {
  res.send("Telegram Bot is running!");
});

app.listen(port, () => {
  console.log(Web server listening at port ${port});
});
