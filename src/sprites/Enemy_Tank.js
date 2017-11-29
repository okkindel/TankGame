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
  }

  move(playerX, playerY, eagleX, eagleY, timeNow) {

    if (timeNow > this.timeToStep) {
      this.timeToStep = timeNow;
      this.timeToStep += 2000 * Math.random();


      
      let myArray =[];
      let distU = Math.sqrt(Math.pow((this.x - playerX), 2) + Math.pow((this.y-1 - playerY), 2));
      let distD = Math.sqrt(Math.pow((this.x - playerX), 2) + Math.pow((this.y+1 - playerY), 2));
      let distR = Math.sqrt(Math.pow((this.x+1 - playerX), 2) + Math.pow((this.y - playerY), 2));
      let distL = Math.sqrt(Math.pow((this.x-1 - playerX), 2) + Math.pow((this.y - playerY), 2));
      let decision = Math.random();
      this.direction = Math.floor(Math.random() * (5 - 1)) + 1;
      if(distD > distU){
        myArray.push(1);
        myArray.push(1);
        myArray.push(1);
        if(distL < distR){
          myArray.push(4);
          myArray.push(4);
          myArray.push(4);
        }else{
          myArray.push(2);
          myArray.push(2);
          myArray.push(2);
        }
      }else{
        myArray.push(3);
        myArray.push(3);
        myArray.push(3);
        if(distL < distR){
          myArray.push(2);
          myArray.push(2);
          myArray.push(2);
        }else{
          myArray.push(4);
          myArray.push(4);
          myArray.push(4);
        }
      }

      // if(playerX > this.x){
      //   for(let i=0; i < 3; i++)
      //     myArray.push(2);

      // }
      // if(playerX < this.x){
      //   for(let i=0; i < 3; i++)
      //     myArray.push(4);
      // }
      // if(playerY > this.y){
      //   for(let i=0; i < 3; i++)
      //     myArray.push(3);
      //  }
      // if(playerY < this.y){
      //   for(let i=0; i < 3; i++)
      //     myArray.push(1);
      // }

      this.direction = myArray[Math.floor(Math.random() * myArray.length)];
      this.body.velocity.setTo(0, 0);
      console.log(this.direction);

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
