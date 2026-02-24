export function initConsoleEasterEgg() {
  console.log(
    '%c' + [
      '  ╭──────────────────────────────────────────╮',
      '  │                                          │',
      '  │   > whoami                               │',
      '  │   Alexander Tarasov — Frontend Dev       │',
      '  │                                          │',
      '  │   > cat ./skills.md                      │',
      '  │   React · TypeScript · Motion · Zustand  │',
      '  │                                          │',
      '  │   > echo $STATUS                         │',
      '  │   Open to interesting projects :)        │',
      '  │                                          │',
      '  ╰──────────────────────────────────────────╯',
      '',
      '  Hey, a fellow dev — glad you\'re here.',
      '  Spotted something interesting in the code? Or just curious?',
      '  Either way, feel free to reach out. The door is open.',
      '',
    ].join('\n'),
    'color: #41bd98; font-family: monospace;',
  );
}
