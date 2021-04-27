'use strict';

const path = require('path');
const { config } = require('dotenv');

config();

exports.NODE_ENV = process.env.NODE_ENV;

exports.DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
exports.DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

exports.COMMAND_PREFIX = process.env.COMMAND_PREFIX;

exports.LOG_PATH = path.resolve(process.env.LOG_PATH);
exports.DB_PATH = path.resolve(process.env.DB_PATH);

exports.WELCOME_VERIFY_MESSAGE_ID = process.env.VERIFY_MESSAGE_ID;
exports.WELCOME_VERIFY_EMOJI_ID = process.env.WELCOME_VERIFY_EMOJI_ID;
