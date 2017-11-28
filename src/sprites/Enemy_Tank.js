import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, (x + 36), (y + 36), asset),
    this.anchor.setTo(0.5),
      this.game.physics.arcade.enable(this),
      this.enableBody = true,
      this.body.immovable = false,
      this.body.collideWorldBounds = true,
      this.timeToStep = 0,
      this.direction = 0;
  }

  move(playerX, playerY, eagleX, eagleY, timeNow) {

    if (timeNow > this.timeToStep) {
      this.timeToStep = timeNow;
      this.timeToStep += 2000 * Math.random();
      this.direction = Math.floor(Math.random() * (5 - 1)) + 1

      let dist = Math.sqrt(Math.pow((this.x - playerX), 2) + Math.pow((this.y - playerY), 2));
      let decision = Math.random();

      this.body.velocity.setTo(0, 0);

    }
    else if (this.direction == 1) {
      this.body.velocity.x += 1;
      this.angle = 90;
    }
    else if (this.direction == 2) {
      this.body.velocity.x -= 1;
      this.angle = 270;
    }
    else if (this.direction == 3) {
      this.body.velocity.y += 1;
      this.angle = 180;
    }
    else if (this.direction == 4) {
      this.body.velocity.y -= 1;
      this.angle = 0;
    }
  }

  die() {
    // this.destroy();
  }

  update() {
  }
}
