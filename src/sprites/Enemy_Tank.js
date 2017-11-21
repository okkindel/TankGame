import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5),
    this.angle = game.rnd.integerInRange(0, 3) * 90,
    this.game.physics.arcade.enable(this),
    this.enableBOdy = true
    this.body.immovable = false;
  }

  update () {
  }
}
