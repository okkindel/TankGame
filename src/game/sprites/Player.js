import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5),
      this.game.physics.arcade.enable(this),
      this.enableBody = true,
      this.body.collideWorldBounds = true;
      this.speed = 100;
      this.slowMode = 0;
  }

  moveRight(){
    this.slowMode ? this.speed = 50 : this.speed = 100;
    this.body.velocity.x = this.speed;
    this.angle = 90;
  }


  moveLeft(){
    this.slowMode ? this.speed = 50 : this.speed = 100;
    this.body.velocity.x = -this.speed;
    this.angle = 270;
  }

  moveDown(){
    this.slowMode ? this.speed = 50 : this.speed = 100;
    this.body.velocity.y = this.speed;
    this.angle = 180;
  }

  moveUp(){
    this.slowMode ? this.speed = 50 : this.speed = 100;
    this.body.velocity.y = -this.speed;
    this.angle = 0;
  }

  setSlowDownMode(isOnWater){
    isOnWater ? this.slowMode = true : this.slowMode = false;
  }

  update() {
  }
}
