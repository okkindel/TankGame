import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5),
    this.angle = game.rnd.integerInRange(0, 3) * 90,
    this.game.physics.arcade.enable(this),
    this.enableBody = true,
    this.body.immovable = false;
  }

  move(playerX, playerY){
    
    let dist = Math.sqrt(Math.pow((this.x - playerX),2) + Math.pow((this.y - playerY),2));
    let decision = Math.random();
    if (decision > 0.50){
      this.x += Math.random()*5;
      this.y += Math.random()*5;
    }else{
      this.x += Math.random()*-1*5;
      this.y += Math.random()*-1*5;
    }
  }

  update () {
  }
}
