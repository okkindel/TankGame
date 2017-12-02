import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {

    //LOADING BARS
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //HERE I AM LOADING ASSETS
    this.load.image('button', 'assets/tank.png')
    this.load.image('tank_img', 'assets/tank.png')
    this.load.image('wall_img', 'assets/wall.png')
    this.load.image('eagle_img', 'assets/eagle.png')
    this.load.image('small_wall_1', 'assets/small_wall_1.png')
    this.load.image('small_wall_2', 'assets/small_wall_2.png')
    this.load.image('small_wall_3', 'assets/small_wall_3.png')
    this.load.image('small_wall_4', 'assets/small_wall_4.png')
    this.load.image('bullet_img', 'assets/bullet.png')
    this.load.image('enemy_img', 'assets/enemy.png')
    this.load.image('enemy_bullet_img', 'assets/enemy_bullet.png')
    this.load.spritesheet('explode_img', 'assets/explode.png', 68, 68)
    this.load.spritesheet('explode_small_img', 'assets/explode_small.png', 48, 48)
    this.load.spritesheet('appear_img', 'assets/appear.png', 68, 68)
  }

  create () {
    this.state.start('Game')
  }
}