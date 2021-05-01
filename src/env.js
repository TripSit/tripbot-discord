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

exports.TRIPSIT_GUILD_ID = process.env.TRIPSIT_GUILD_ID;
exports.RULES_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;
exports.RULES_VERIFICATION_MESSAGE_ID = process.env.WELCOME_VERIFICATION_MESSAGE_ID;
exports.RULES_VERIFICATION_EMOJI_ID = process.env.WELCOME_VERIFICATION_EMOJI_ID;
exports.RULES_VERIFY_ROLE_ID = process.env.RULES_VERIFY_ROLE_ID;
