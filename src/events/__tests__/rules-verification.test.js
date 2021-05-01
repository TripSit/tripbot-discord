'use strict';

const rulesVerification = require('../rules-verification');

const client = {
  on: jest.fn(),
  guilds: { fetch: jest.fn() },
};

const user = {
  roles: {
    id: 'mockUserId',
    username: 'mrcoolguy69',
    avatar: 'https://cool.images/radones',
    locale: 'America/Toronto',
    createdAt: new Date('1990-10-10'),
    cache: { has: jest.fn() },
  },
};
