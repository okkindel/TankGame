import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {

    //JAKIEŚ PASKI ŁADOWANIA NA KIJU
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    // HERE I AM LOADING ASSETS
    this.load.image('tank_img', 'assets/tank.png')
    this.load.image('wall_img', 'assets/wall.png')
    this.load.image('bullet_img', 'assets/bullet.png')
    this.load.image('enemy_img', 'assets/enemy.png')
    this.load.image('explode_img', 'assets/explode.png')
    this.load.image('enemy_bullet_img', 'assets/enemy_bullet.png')
  }

  create () {
    this.state.start('Game')
  }
}