import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset,Game }) {
    super(game, x, y, asset),
      this.anchor.setTo(0.5),
      this.game.physics.arcade.enable(this),
      this.enableBody = true,
      this.Game = Game;
      //this.body.immovable = false,
      this.body.collideWorldBounds = true,
      this.timeToStep = 0,
      this.direction = "up"
      this.points = 50;
    //RIGHT LEFT DOWN UP
    this.chances = [25, 25, 25, 25];
  }

  distanceFromTo(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
  }

  move() {
    this.playerX = this.Game.player.x;
    this.playerY = this.Game.player.y;
    this.eagleX = this.Game.eagle.x;
    this.eagleY = this.Game.eagle.y;

    if (this.game.time.now > this.timeToStep) {
      let dist_to_player = this.distanceFromTo(this.x, this.playerX, this.y, this.playerY);
      let dist_to_eagle = this.distanceFromTo(this.x, this.eagleX, this.y, this.eagleY);

      if (dist_to_player > dist_to_eagle) {
        // Swap
        this.playerX = this.eagleX;
        this.playerY = this.eagleY
      }

      this.timeToStep = this.game.time.now;
      this.timeToStep += Math.floor(1000 * Math.random());

      let diff_x = this.playerX - this.x;
      let diff_y = this.playerY - this.y;

      if (diff_x > 0) {
        this.chances[0] += 25;
      } else {
        this.chances[1] += 25;
      }

      if (diff_y > 0) {
        this.chances[2] += 25;
      } else {
        this.chances[3] += 25;
      }

      let randomSum = 0;
      let dirChance = 0;

      for (let i = 0; i < 4; i++) {
        randomSum += this.chances[i];
      }

      dirChance = Math.floor(Math.random() * randomSum);

      this.body.velocity.setTo(0, 0);

      if (dirChance < this.chances[0]) {
        this.direction = 'right'; //RIGHT
        this.angle = 90;
        this.body.velocity.x = 100;
      } else if (dirChance < this.chances[0] + this.chances[1]) {
        this.direction = 'left'; //LEFT
        this.angle = 270;
        this.body.velocity.x = -100;
      } else if (dirChance < this.chances[0] + this.chances[1] + this.chances[2]) {
        this.direction = 'down'; //DOWN
        this.angle = 180;
        this.body.velocity.y = 100;
      } else {
        this.direction = 'up'; //UP
        
        this.angle = 0;
        this.body.velocity.y = -100;
      }

      if (randomSum >= 1000) {
        this.chances = [25, 25, 25, 25];
      }

    }
  }

  getDirection(){
    return this.direction;
  }

  update() {
    this.move();

  }
}
