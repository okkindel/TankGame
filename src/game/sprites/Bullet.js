import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, direction, velocity , shooter}) {
    super(game, x, y, asset),
      this.game.physics.arcade.enable(this),
      this.exists = false,
      this.visible = false,
      this.enableBody = true,
      this.checkWorldBounds = true;
      this.direction = direction;
      this.velocity = velocity;
      this.spawnOffset = {x:4,y:20};
      this.shooter = shooter;


      if(this.direction === 'up'){
        this.reset(x - 4,y - 30);
        this.body.velocity.y = -velocity;
      }

      if(this.direction === 'down'){
        this.reset(x-4,y + 20);
        this.body.velocity.y = velocity;
      }

      if(this.direction === 'left'){
        this.reset(x - 30,y -4);
        this.body.velocity.x = -velocity;
      }

      if(this.direction === 'right'){
        this.reset(x + 20,y-4);
        this.body.velocity.x = velocity;
      }
  }

  update() {
  }
}
