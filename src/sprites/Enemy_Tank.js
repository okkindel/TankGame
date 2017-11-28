import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({game, x, y, asset}) {
    super(game, x, y, asset),
    this.anchor.setTo(0.5),
    this.angle = game.rnd.integerInRange(0, 3) * 90,
    this.game.physics.arcade.enable(this),
    this.enableBody = true,
    this.body.immovable = false,
    this.body.collideWorldBounds = true,
    this.timeToStep = 0,
    this.direction = 1;
  }

  move(playerX, playerY, timeNow){
    
    if(timeNow > this.timeToStep){
      this.timeToStep = timeNow;
      this.timeToStep += 2000*Math.random();
      this.direction = Math.floor(Math.random() * ( 5 - 1)) + 1

    if (timeNow > this.timeToStep) {
      this.timeToStep = timeNow;
      this.timeToStep += 2000 * Math.random();
      this.direction = Math.floor(Math.random() * (5 - 1)) + 1
      console.log(this.direction);
      let dist = Math.sqrt(Math.pow((this.x - playerX), 2) + Math.pow((this.y - playerY), 2));
      let decision = Math.random();

    } else if (this.direction == 1) {
      this.x += 1;
    } else if (this.direction == 2) {
      this.x -= 1;
    } else if (this.direction == 3) {
      this.y += 1;
    } else if (this.direction == 4) {
      this.y -= 1;
    }
    console.log(this.direction);

    // else if(this.x > playerX && this.y > playerY){   this.x -= 1;   this.y -= 1;
    // } else if(this.x < playerX && this.y < playerY){   this.x += 1;   this.y +=
    // 1; } else if(this.x > playerX && this.y < playerY){   this.x -= 1;   this.y
    // += 1; } else if(this.x < playerX && this.y > playerY){   this.x += 1;
    // this.y -= 1; }
  }

  die() {
    // this.destroy();
  }

  update() {}
}
