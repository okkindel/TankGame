import Bonus from '../Bonus'

export default class BonusSpeedUp extends Bonus {
    constructor(game, x, y, asset, lifeTime) {
        super(game, x, y, asset, lifeTime);
        this.value = 1;
    }
    update() {
        if (this.game.time.now > this.lifeTime)
            this.kill();
    }
    modify(player) {
        player.modifyAttributes({ name: "immortality", value: this.value });
    }
}