const { hasOccurred } = require('./lib/random');

class Character {
  constructor(
    x,
    y,
    health,
    options = {
      probabilities: {
        critical: 0.1,
        dodgeProb: 0.2,
      },
    }
  ) {
    this.x = x;
    this.y = y;
    this.options = options;
    this.health = health;
    this.criticalProb = hasOccurred(options.probabilities.critical);
    this.dodgeProb = hasOccurred(options.probabilities.dodgeProb);
  }

  move(x, y) {
    return new Character(x, y, this.health, this.options);
  }

  defend(baseDamage) {
    if (this.dodgeProb()) {
      console.log('Attacker dodged!');

      return this;
    }

    if (this.criticalProb()) {
      console.log('Critical attack received!');
      const health = this.health - baseDamage * 2;

      return new Character(this.x, this.y, health, this.options);
    }

    console.log('Normal attack received!');
    const health = this.health - baseDamage;

    return new Character(this.x, this.y, health, this.options);
  }

  isAlive() {
    return this.health > 0;
  }
}

module.exports = {
  Character,
};
