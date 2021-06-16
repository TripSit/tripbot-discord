import { Command } from '../types';

const barExamCommand: Command = {
  name: 'Bar Exam',
  description: 'Provides usage information about the bot and it\'s various commands.',
  usage: {
    syntax: '~barExam <user>',
    examples: [
      '~barExam @supermario',
    ],
  },

  async execute(message) {
    await message.reply('AYYO');
  },
};

export default barExamCommand;
