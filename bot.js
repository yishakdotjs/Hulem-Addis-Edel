const TelegramBot = require('node-telegram-bot-api');
const mongoose = require("mongoose");
const User = require("./models/users");
const dotenv = require("dotenv");

// Config
mongoose.connect('mongodb://127.0.0.1:27017/hulem_addis');
dotenv.config();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Start Command Handler
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.chat.first_name;

    const checkUser = await User.findOne({
        chatId: chatId
    })

    if (!checkUser) {
        const newUser = new User({
            chatId: chatId,
            firstName: firstName
        });

        await newUser.save();
    }

    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Play Now', url: 'http://34.29.20.8/products?chatId=' + chatId },
                ]
            ]
        }
    };

    await bot.sendMessage(chatId, "ውድ " + firstName + "፣ \n\nእንኳን ወደ ሁሌም አዲስ እድል ቦት በሰላም መጡ። ክታች ያለውን ማስፈንጠሪያ በመንካት እድሎትን ይሞክሩ። 👇", inlineKeyboard);
});