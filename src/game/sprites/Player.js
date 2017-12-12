import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5),
      this.game.physics.arcade.enable(this),
      this.enableBody = true,
      this.body.collideWorldBounds = true;
      this.speed = 100;
      this.direction = 'up';
      this.slowMode = 0;
  }

  moveRight(){
    this.slowMode ? this.speed = 50 : this.speed = 100;
    this.body.velocity.x = this.speed;
    this.angle = 90;
    this.direction = 'right';
  }


  moveLeft(){
    this.slowMode ? this.speed = 50 : this.speed = 100;
    this.body.velocity.x = -this.speed;
    this.angle = 270;
    this.direction = 'left';
  }

  moveDown(){
    this.slowMode ? this.speed = 50 : this.speed = 100;
    this.body.velocity.y = this.speed;
    this.angle = 180;
    this.direction = 'down';
  }

  moveUp(){
    this.slowMode ? this.speed = 50 : this.speed = 100;
    this.body.velocity.y = -this.speed;
    this.angle = 0;
    this.direction = 'up';
  }

  setSlowDownMode(isOnWater){
    isOnWater ? this.slowMode = true : this.slowMode = false;
  }


  getDirection(){
    return this.direction;
  }

  update() {
  }
}
