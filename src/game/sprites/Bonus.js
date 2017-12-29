import Phaser from 'phaser'

export default class Bonus extends Phaser.Sprite {
    constructor({ game, x, y, asset, lifeTime }) {
        super(game, (x + 9), (y + 9), asset);
        this.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this);
        this.enableBody = true;
        this.body.immovable = true;
        this.lifeTime = 10000;
        this.lifeTime = this.game.time.now + lifeTime;
    }

    update() {
    }

    modify(player) {
        console.log("modify!");
    }
}
