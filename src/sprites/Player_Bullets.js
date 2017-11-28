import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game.physics.arcade.enable(this),
    this.exists = false,
    this.visible = false,
    this.enableBOdy = true,
    this.checkWorldBounds = true;
  }

  die(bullet){
    //this.bullet.destroy();
  }
  
  update () {
  }
}
