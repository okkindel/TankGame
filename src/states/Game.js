import Phaser from 'phaser'
import Enemy from '../sprites/Enemy_Tank'
import Player_Bullets from '../sprites/Player_Bullets'
import Player from '../sprites/Player'

export default class extends Phaser.State {
 
  constructor () {
    super()
    this.bullet_time = 0;
    this.enemy_bullet_time = 0;
  }

  init () {}
  preload () {}

  create () {
    var new_enemy;
    //ENEMY TANK
    this.enemies = this.game.add.group();
    for (var i = 0; i < 20; i++) {
      this.enemy = new Enemy({
        game: this.game,
        x: this.game.world.randomX,
        y: this.game.rnd.integerInRange(0, 450),
        asset: 'enemy_img'
      })
      this.enemies.add(this.enemy);
      }

    this.game.physics.arcade.enable(this.enemies);
    this.enemies.enableBody = true;

    //PLAYER TANK
    this.player = new Player({
      game: this.game,
      x: 466,
      y: 556,
      asset: 'tank_img'
    })
    this.game.add.existing(this.player)

    //PLAYER BULLETS
    this.bullets = this.game.add.group();
    for (var i = 0; i < 20; i++) {
      this.bullet = new Player_Bullets({
        game: this.game,
        asset: 'bullet_img'
      })
      this.bullet.events.onOutOfBounds.add(this.resetBullet, this);
      this.bullets.add(this.bullet);
      }

    //CURSORS
    this.cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  }

  update() {

    this.enemies.forEachAlive(function(enemy) {
      enemy.move(this.player.x, this.player.y);
    }, this)

    //COLLISIONS
    this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionEnemy, null, this);

    this.game.physics.arcade.collide(this.player, this.enemies);
    this.game.physics.arcade.collide(this.enemies, this.enemies);

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
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.fireBullet();
      }
    }
  }
  
  fireBullet() {
    
    if (this.game.time.now > this.bullet_time) {
      this.bullet = this.bullets.getFirstExists(false);
  
      if (this.bullet) {
        if (this.player_dir === 'up') {
          this.bullet.reset(this.player.x - 4, this.player.y - 20);
          this.bullet.body.velocity.y = -200;
        }
        if (this.player_dir === 'down') {
          this.bullet.reset(this.player.x - 4, this.player.y + 20);
          this.bullet.body.velocity.y = +200;
        }
        if (this.player_dir === 'left') {
          this.bullet.reset(this.player.x - 20, this.player.y - 4);
          this.bullet.body.velocity.x = -200;
        }
        if (this.player_dir === 'right') {
          this.bullet.reset(this.player.x + 20, this.player.y - 4);
          this.bullet.body.velocity.x = +200;
        }
        this.bullet_time = this.game.time.now + 500;
      }
    }
  }

  /*enemyFires() {
    enemy_bullet = enemy_bullets.getFirstExists(false);
    livingEnemies.length = 0;
  
    enemies.forEachAlive((enemy) => {
      livingEnemies.push(enemy);
    });
  
    if (enemy_bullet && livingEnemies.length > 0) {
      const random = game.rnd.integerInRange(0, livingEnemies.length - 1);
      const shooter = livingEnemies[random];
      enemy_bullet.reset(shooter.body.x, shooter.body.y);
      game.physics.arcade.moveToObject(enemy_bullet, player, 120);
      enemy_bullet_time = game.time.now + 2000;
    }
  }*/
  collisionEnemy(enemy, object) {
    object.kill();
    enemy.kill();
  
    //const explosion = explosions.getFirstExists(false);
    //explosion.reset(object.body.x, object.body.y);
    //explosion.play('kaboom', 30, false, true);
  }
  resetBullet(bullet) {
    bullet.kill();
  }
  collisionHandler(object, bullet) {
    object.kill();
  }

  render () {
  }
}
