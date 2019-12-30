import { Mittens } from './mittens/mittens.class';
import ansiEscapes from 'ansi-escapes';
import multiProgress from 'multi-progress';
import readline from 'readline';

console.log('-------------------------------');
console.log('Welcome to Mittens, the pet RPG');
console.log('-------------------------------');

console.log(`
       .^----^.
      (= o  O =)
       (___V__)
        _|==|_
   ___/' |--| |
  / ,._| |  | '
 | \__ |__}-|__}
  \___)\`
`);

console.log('-------------------------------');
console.log('Your mission is to keep up with mittens needs\n\
by entering the right commands at the right time');

console.log('-------------------------------\n');

console.log('The primary command you will need is the "give" command.\n');

console.log('Mittens has 4 different needs that have to be satisfied, food, water, play and love.');
console.log('If any of these statuses get below 0 mittens dies, and so do you. Have fun!\n');

console.log('Enter "start" to begin');

const stdin = process.openStdin();
const write = process.stdout.write.bind(process.stdout);
const mittens = new Mittens();
let started = false;

stdin.addListener('data', (d) => {

  const command = d.toString().trim();

  switch (command) {
    case 'give food':
      mittens.give('food');
      break;
    case 'give water':
      mittens.give('water');
      break;
    case 'give play':
      mittens.give('play');
      break;
    case 'give love':
      mittens.give('love');
      break;
    case 'start': {
      if (!started) {
        start();
        started = true;
      }
      break;
    }
    default:
      break;
  }

  readline.moveCursor(process.stdout, 0, -1);
  console.log(' '.repeat(100));
  readline.moveCursor(process.stdout, 0, -1);

});

/**
 * Start the game loop
 */
function start() {

  const multi = new multiProgress(process.stderr);

  // Initialize bars //
  const foodBar = multi.newBar('Food  [:bar] :percent', {
    complete   : '=',
    incomplete : ' ',
    width      : 30,
    total      : 100,
  });

  const waterBar = multi.newBar('Water [:bar] :percent', {
    complete   : '=',
    incomplete : ' ',
    width      : 30,
    total      : 100,
  });

  const playBar = multi.newBar('Play  [:bar] :percent', {
    complete   : '=',
    incomplete : ' ',
    width      : 30,
    total      : 100,
  });

  const loveBar = multi.newBar('Love  [:bar] :percent', {
    complete   : '=',
    incomplete : ' ',
    width      : 30,
    total      : 100,
  });

  // Start by clearing the screen and positioning the cursor on the second line
  // (because the progress bar will be positioned on the first line)
  write(ansiEscapes.clearScreen + ansiEscapes.cursorTo(0, 13));

  // Main Game Loop //
  setInterval(
    () => {
      mittens.passHour();

      // Save cursor position and move it to the top left corner.
      write(ansiEscapes.cursorSavePosition + ansiEscapes.cursorTo(0, 1));

      // Update the progress bars
      foodBar.update(mittens.needs.food / 100);
      waterBar.update(mittens.needs.water / 100);
      playBar.update(mittens.needs.play / 100);
      loveBar.update(mittens.needs.love / 100);
      console.log(`\nDays alive ${mittens.daysAlive}\n`);
      console.log('Commands: give [food, water, love, play]\n');

      console.log('-------------------------------');
      console.log(`Events: ${mittens.event()}`);
      console.log('-------------------------------');

      // Check if mittens has died //
      Object.keys(mittens.needs).forEach((key) => {
        if (mittens.needs[key] <= 0) {
          write(ansiEscapes.clearScreen);
          console.log(`Mittens died on day ${mittens.daysAlive}... today is a horrible day...`);
          process.exit();
        }
      });

      // Restore the cursor position.
      write(ansiEscapes.cursorRestorePosition);
    },
    1000,
  );

}
