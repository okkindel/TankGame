import Phaser from 'phaser'

export default class AbstractTank extends Phaser.Sprite {
  constructor({ game, x, y, asset, Game }) {
    super(game, x, y, asset);

    if(new.target === AbstractTank) {
      throw new Error("Creation of AbstractTank is forbidden");
    }

    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.Game = Game;
    this.body.collideWorldBounds = true,
    this.direction = "up"

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
}
