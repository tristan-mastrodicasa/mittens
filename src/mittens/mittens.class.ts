export class Mittens {

  public needs = {
    food: 100.0,
    water: 100.0,
    play: 100.0,
    love: 100.0,
  };

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

}
