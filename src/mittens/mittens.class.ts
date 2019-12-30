export class Mittens {

  public needs = {
    food: 100.0,
    water: 100.0,
    play: 100.0,
    love: 100.0,
  };

  private events: { message: string, callback: () => void }[] = [
    {
      message: 'Mittens finds a rabit to hunt +6 play +4 food',
      callback: () => {
        this.needs.food += 4;
        this.needs.play += 6;
      },
    },
    {
      message: 'Mittens meets another cat +2 play +6 love',
      callback: () => {
        this.needs.love += 6;
        this.needs.play += 2;
      },
    },
    {
      message: 'Mittens falls into a water hole +3 water',
      callback: () => {
        this.needs.water += 3;
      },
    },
    {
      message: 'Mittens finds the hidden cat treats +8 food -3 water',
      callback: () => {
        this.needs.food += 8;
        this.needs.water -= 3;
      },
    },
  ];

  public daysAlive = 0;
  public hours = 0;

  constructor() {}

  /**
   * One game loop is the equivalent of one hour in game
   * @param  intensity How intense mittens statuses are affected
   */
  public passHour() {

    const intensity = 0.2 + (0.06 * this.daysAlive);

    Object.keys(this.needs).forEach((key) => {
      this.needs[key] -= (Math.floor(Math.random() * 10) * intensity);
    });

    this.hours += 1;

    if (this.hours === 24) {
      this.hours = 0;
      this.daysAlive += 1;
    }
  }

  /**
   * Standardised status increase method
   * @param  key Key of the need
   */
  public give(key: string) {
    this.needs[key] += 5;
    if (this.needs[key] > 100) this.needs[key] = 100.0;
  }

  /** Random events to spice up the game */
  public event() {
    if (Math.floor(Math.random() * 100) < 5) {
      const event = this.events[Math.floor(Math.random() * 3)];

      event.callback();
      return event.message;
    }

    return '';
  }

}
