import { Usage } from '../types';

export default function formatUsage(usage: Usage): string {
  if (!usage.examples.length) throw new Error('Usage must contain examples.');

  return `
Invalid usage of command.

USAGE: ${usage.syntax}

*Examples:*
\`\`\`
${usage.examples.join('\n')}
\`\`\`
  `.trim();
}
