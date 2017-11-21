import Phaser from 'phaser'
import Enemy from '../sprites/Enemy_Tank'
import Player from '../sprites/Player'

export default class extends Phaser.State {

  constructor () {
    super()
    let cursors;
    let enemies;
    let player_dir;
  }

  init () {}
  preload () {}

  create () {

    //ENEMY TANK

    this.enemies = game.add.group();
    this.game.physics.arcade.enable(this.enemies);
    this.enemies.enableBody = true;

    for (var i = 0; i < 20; i++) {
      this.enemy = new Enemy({
        game: this.game,
        x: this.game.world.randomX,
        y: this.game.rnd.integerInRange(0, 450),
        asset: 'enemy_img'
      })
      this.enemies.create(this.enemy);
      this.game.add.existing(this.enemy);
    }

    //PLAYER TANK
    this.player = new Player({
      game: this.game,
      x: 416,
      y: 556,
      asset: 'tank_img'
    })
    this.game.add.existing(this.player)

    //CURSORS
    this.cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    
  }

  update() {

    //COLLISIONS

    this.game.physics.arcade.collide(this.player, this.enemies);

    if (this.player.alive) {

      //MOVING

      this.player.body.velocity.setTo(0, 0);

      if (this.cursors.left.isDown) {
        this.player_dir = 'left';
        this.player.body.velocity.x = -100;
        this.player.angle = 270;
      }
      else if (this.cursors.right.isDown) {
        this.player_dir = 'right';
        this.player.body.velocity.x = 100;
        this.player.angle = 90;
      }
      else if (this.cursors.up.isDown) {
        this.player_dir = 'up';
        this.player.body.velocity.y = -100;
        this.player.angle = 0;
      }
      else if (this.cursors.down.isDown) {
        this.player_dir = 'down';
        this.player.body.velocity.y = 100;
        this.player.angle = 180;
      }
    }
  }

  render () {
  }
}
