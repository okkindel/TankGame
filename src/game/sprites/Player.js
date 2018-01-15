import Phaser from 'phaser'
import Bullet from '../sprites/Bullet'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, controls, appContext }) {
    super(game, x, y, asset);
    this.controls = controls;
    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.collideWorldBounds = true;
    this.speed = 100;
    this.direction = 'up';
    this.immortality = 0;
    this.save = [{}];
    this.appContext = appContext;
    this.lives = 3;
    this.position = {x: x, y: y};
    this.lastShot = 0;
  }

  modifyLives(num) {
    this.lives += num;
  }

  getLives() {
    return this.lives;
  }

  moveRight() {
    this.body.velocity.x = this.speed;
    this.angle = 90;
    this.direction = 'right';
  }

  moveLeft() {
    this.body.velocity.x = -this.speed;
    this.angle = 270;
    this.direction = 'left';
  }

  moveDown() {
    this.body.velocity.y = this.speed;
    this.angle = 180;
    this.direction = 'down';
  }

  moveUp() {
    this.body.velocity.y = -this.speed;
    this.angle = 0;
    this.direction = 'up';
  }

  setSlowDownMode(isOnWater) {
    isOnWater ? this.speed = 50 : this.speed = 100;
  }


  getDirection() {
    return this.direction;
  }

  modifyAttributes(obj) {
    let before = this[obj.name];
    setTimeout(() => {
      this[obj.name] = before;
    }, 5000);

    this[obj.name] = obj.value;
  }

  fire() {
      this.lastShot = this.game.time.now;
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
    
  

  update() {
    if (this.alive) {

      //MOVING
      this.body.velocity.setTo(0, 0);

      if (this.controls.left.isDown) {
        this.moveLeft();
      }
      else if (this.controls.right.isDown) {
        this.moveRight();
      }
      else if (this.controls.up.isDown) {
        this.moveUp();
      }
      else if (this.controls.down.isDown) {
        this.moveDown();
      }

      if (this.controls.fire.isDown && this.game.time.now > this.lastShot + 500) {
        this.fire();
        this.lastShot = this.game.time.now;
      }
    }
  }
}
