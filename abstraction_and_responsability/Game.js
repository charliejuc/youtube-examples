const { Character } = require('./Character');
const { RandomGridList } = require('./grid/RandomGridList');
const { randomInteger } = require('./lib/random');

const difficultyTypes = {
  easy: 'easy',
  normal: 'normal',
  hard: 'hard',
};

class Game {
  constructor(health, xMax, yMax, options = { difficulty: difficultyTypes.normal }) {
    this.difficulty = options.difficulty || difficultyTypes.normal;

    const difficultyMultiplier = this.getDifficultyMultiplier();

    this.character = new Character(null, null, health, {
      probabilities: {
        dodgeProb: 0.1 / difficultyMultiplier,
        critical: 0.1 * difficultyMultiplier,
      },
    });

    this.baseDamage = 10;
    this.enemyProbability = 0.15 * difficultyMultiplier;
    this.grids = new RandomGridList(xMax, yMax, {
      enemy: {
        probability: this.enemyProbability,
        damage: this.calculateDamage(this.baseDamage),
      },
    });
  }

  getDifficultyMultiplier() {
    if (this.difficulty === difficultyTypes.hard) {
      return 1.5;
    }

    if (this.difficulty === difficultyTypes.normal) {
      return 0.8;
    }

    return 0.4;
  }

  calculateDamage(damage) {
    if (this.difficulty === difficultyTypes.hard) {
      return damage * 3;
    }

    if (this.difficulty === difficultyTypes.normal) {
      return damage * 2;
    }

    return damage;
  }

  async start() {
    return new Promise((resolve) => {
      const resolveAndClear = (...args) => {
        clearInterval(intervalId);

        return resolve(...args);
      };

      const intervalId = setInterval(() => {
        console.clear();
        const nextX = randomInteger(this.grids.xMax);
        const nextY = randomInteger(this.grids.yMax);
        const currentGrid = this.grids.getGrid(nextX, nextY);

        const { character, won, points } = currentGrid.moveHere(this.character);
        this.character = character;

        console.log(this.grids.show(this.character));

        if (!this.character.isAlive()) {
          console.log('You are dead!');
          return resolveAndClear(0);
        }

        console.log(`Current health: ${this.character.health}`);

        if (!won) {
          return;
        }

        console.log(`You won with "${points}" points"`);
        resolveAndClear(points);
      }, 1000);
    });
  }
}

const health = 100;
const xMax = 5;
const yMax = 5;

const game = new Game(health, xMax, yMax, {
  difficulty: difficultyTypes.hard,
});

game.start().then(console.log);
