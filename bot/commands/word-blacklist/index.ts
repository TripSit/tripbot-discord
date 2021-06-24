import list from './list';
import add from './add';
import { ParentCommand } from '../../types';

const wordBlacklistCommand: ParentCommand = {
  name: 'Word Blacklist',
  description: 'Blacklists particular words globally or from specfic channels.',
  commands: {
    list,
    ls: list,
    add,
  },
};

export default wordBlacklistCommand;
