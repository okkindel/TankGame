import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset),
      this.anchor.setTo(0.5),
      this.game.physics.arcade.enable(this),
      this.enableBody = true,
      this.body.immovable = false,
      this.body.collideWorldBounds = true,
      this.timeToStep = 0,
      this.direction = 0;
      this.directions = [];
  }

  move(playerX, playerY, eagleX, eagleY, timeNow) {

    if (timeNow > this.timeToStep) {
      this.timeToStep = timeNow;
      this.timeToStep += Math.floor(2000 * Math.random());

        while(this.directions.length > 20)
          this.directions.shift();

      
      let distU = Math.abs(this.x - playerX) + Math.abs(this.y-1 - playerY);
      let distD = Math.abs(this.x - playerX) + Math.abs(this.y+1 - playerY);
      let distR = Math.abs(this.x+1 - playerX) + Math.abs(this.y - playerY);
      let distL = Math.abs(this.x-1 - playerX) + Math.abs(this.y - playerY);

      if(playerX > this.x){
        for(let i=0; i < 3; i++)
          this.directions.push(1);
      }
      if(playerX < this.x){
        for(let i=0; i < 3; i++)
          this.directions.push(3);
      }
      if(playerY > this.y){
        for(let i=0; i < 3; i++)
          this.directions.push(2);
       }
      if(playerY < this.y){
        for(let i=0; i < 3; i++)
          this.directions.push(4);
      }

      this.direction = this.directions[Math.floor(Math.random() * this.directions.length)];
      this.body.velocity.setTo(0, 0);
      console.log(this.directions);

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
