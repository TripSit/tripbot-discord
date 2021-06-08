import * as commands from '../commands';

export default function isCommand(command: string): boolean {
  return Object.keys(commands).includes(command);
}
