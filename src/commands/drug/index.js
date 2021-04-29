'use strict';

const dose = require('./dose');

const subcommands = {
  dose,
};

module.exports = async function drugCommand(deps, subcommand, ...args) {
  const cmd = subcommands[subcommand];
  if (!cmd) throw new Error(`Subcommand ${subcommand} does not exist`);
  return cmd(deps, ...args);
};
