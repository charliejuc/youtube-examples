class EnemyGrid {
  constructor(x, y, damage) {
    this.x = x;
    this.y = y;
    this.baseDamage = damage;
  }

  moveHere(character) {
    const movedCharacter = character.move(this.x, this.y);
    const hurtCharacter = movedCharacter.defend(this.baseDamage);

    return {
      character: hurtCharacter,
      won: false,
    };
  }
}

module.exports = {
  EnemyGrid,
};
