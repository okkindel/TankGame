import Phaser from 'phaser'
import Bullet from '../../sprites/Bullet'

export default class AbstractTank extends Phaser.Sprite {
  constructor({ game, x, y, asset, Game }) {
    super(game, x, y, asset);

    if(new.target === AbstractTank) {
      throw new Error("Creation of AbstractTank is forbidden");
    }

    this.anchor.setTo(0.5);
    this.appContext = Game;
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.Game = Game;
    this.body.collideWorldBounds = true;
    this.direction = "up";
    this.points = 25;
    this.live_counter = 1;
    this.lastShot =  0;
  }


  fire() {
    let bullet = new Bullet({
      game: this.game,
      x: this.position.x,
      y: this.position.y,
      asset: 'enemy_bullet_img',
      direction: this.getDirection(),
      velocity: 150,
      shooter: this
    })
    bullet.events.onOutOfBounds.add(this.appContext.resetObject, this.appContext);
    this.appContext.bullets.add(bullet);
    console.log(this.appContext.bullets.length)
  }

  setAnchor(val) {
    this.anchor.setTo(0.5);
  }

  setPhysicsEnable(val) {
    if(val === true || val === false) {
      this.body.enableBody = val;
    } else {
      throw new Error("setPhysicsEnable argument must be a boolean");
    }
  }

  setCollideBorders(val) {
    if(val === true || val === false) {
      this.body.collideWorldBounds = val;
    } else {
      throw new Error("setCollideBorders argument must be a boolean");
    }
  }

  setDirection(dir) {
    switch(dir) {
      case "up":
      case "down":
      case "left":
      case "right":
        this.direction = dir;
        break;
      default:
        throw new Error("Invalid direction argument");
    }
  }

  distanceFromTo(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
  }

  getDirection(){
    return this.direction;
  }

  move(){
  
  }

  update(){
    this.move();
    if(this.game.time.now > this.lastShot + 1000 + Math.random()*1500){
      this.fire();
      this.lastShot = this.game.time.now;
      console.log("pal")
    }
  }
}
