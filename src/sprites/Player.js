import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, (x + 27), (y + 18), asset),
    this.anchor.setTo(0.5),
    this.game.physics.arcade.enable(this),
    this.enableBody = true,
    this.body.collideWorldBounds = true;
  }

  update() {
  }
}
