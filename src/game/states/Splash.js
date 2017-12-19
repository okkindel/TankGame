import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import tank_img from '../assets/tank.png'
import wall_img from '../assets/wall.png'
import water_img from '../assets/water.png'
import leaves_img from '../assets/leaves.png'
import eagle_img from '../assets/eagle.png'
import small_wall_1_img from '../assets/small_wall_1.png'
import small_wall_2_img from '../assets/small_wall_2.png'
import small_wall_3_img from '../assets/small_wall_3.png'
import small_wall_4_img from '../assets/small_wall_4.png'
import bullet_img from '../assets/bullet.png'
import enemy_img from '../assets/enemy.png'
import enemy_blue_img from '../assets/enemy_blue.png'
import enemy_bullet_img from '../assets/enemy_bullet.png'
import explode_img from '../assets/explode.png'
import explode_small_img from '../assets/explode_small.png'
import appear_img from '../assets/appear.png'
import button_img from '../assets/button.png'
import bonus_speed from '../assets/bonus/bonus_speed.png'

export default class extends Phaser.State {
  init() {}

  preload() {

    //LOADING BARS
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    // HERE I AM LOADING ASSETS
    this.load.image('button', button_img)
    this.load.image('tank_img', tank_img)
    this.load.image('wall_img', wall_img)
    this.load.image('water_img', water_img)
    this.load.image('leaves_img', leaves_img)
    this.load.image('eagle_img', eagle_img)
    this.load.image('small_wall_1', small_wall_1_img)
    this.load.image('small_wall_2', small_wall_2_img)
    this.load.image('small_wall_3', small_wall_3_img)
    this.load.image('small_wall_4', small_wall_4_img)
    this.load.image('bullet_img', bullet_img)
    this.load.image('enemy_img', enemy_img)
    this.load.image('enemy_blue_img', enemy_blue_img)
    this.load.image('bonus_speed', bonus_speed)
    this.load.image('enemy_bullet_img', enemy_bullet_img)
    this.load.spritesheet('explode_img', explode_img, 68, 68)
    this.load.spritesheet('explode_small_img', explode_small_img, 48, 48)
    this.load.spritesheet('appear_img', appear_img, 68, 68)
  }

  create() {
    this.state.start('Game')
  }
}