import Phaser from 'phaser'
import Enemy from '../sprites/Enemy_Tank'
import Player_Bullets from '../sprites/Player_Bullets'
import Enemy_Bullets from '../sprites/Enemy_Bullets'
import Player from '../sprites/Player'

export default class extends Phaser.State {
 
  constructor () {
    super()
    this.bullet_time = 0;
    this.enemy_bullet_time = 0;
    this.player_lives = 3;
  }

  init () {}
  preload () {}
  create () {

//ENEMY TANK
    this.enemies = this.game.add.group();
    for (var i = 0; i < 20; i++) {
      this.enemy = new Enemy({
        game: this.game,
        x: this.game.world.randomX,
        y: this.game.rnd.integerInRange(0, 450),
        asset: 'enemy_img'
      })
      this.enemy.events.onOutOfBounds.add(this.resetObject, this);
      this.enemies.add(this.enemy);
    }

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
      this.bullet.events.onOutOfBounds.add(this.resetObject, this);
      this.bullets.add(this.bullet);
    }

//ENEMY BULLETS
    this.enemy_bullets = this.game.add.group();
    for (var i = 0; i < 20; i++) {
      this.enemy_bullet = new Enemy_Bullets({
        game: this.game,
        asset: 'enemy_bullet_img'
      })
      this.enemy_bullet.events.onOutOfBounds.add(this.resetObject, this);
      this.enemy_bullets.add(this.enemy_bullet);
    }

//EXPLOSIONS
    this.explosions = this.game.add.group();
    this.explosions.createMultiple(30, 'explode_img');
    this.explosions.forEach(this.boom, this);

//CURSORS
    this.cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  }

  boom(enemy) {
    enemy.anchor.x = 0.5;
    enemy.anchor.y = 0.5;
    enemy.animations.add('kaboom');
  }

  update() {
    
    this.enemies.forEachAlive(function(enemy) {
      enemy.move(this.player.x, this.player.y, this.game.time.now);
    }, this);

    
    //COLLISIONS
    this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionEnemy, null, this);
    game.physics.arcade.overlap(this.bullets, this.enemy_bullets, this.collisionEnemy, null, this);
    game.physics.arcade.overlap(this.enemy_bullets, this.player, this.collisionPlayer, null, this);

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
      if (this.game.time.now > this.enemy_bullet_time) {
        this.enemyFires();
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

  enemyFires() {
    this.livingEnemies = [];
    this.livingEnemies.length = 0;
    this.enemy_bullet = this.enemy_bullets.getFirstExists(false);
    this.enemies.forEachAlive((enemy) => {
      this.livingEnemies.push(enemy);
    });

    if (this.enemy_bullet && this.livingEnemies.length > 0) {
      const random = this.game.rnd.integerInRange(0, this.livingEnemies.length - 1);
      const shooter = this.livingEnemies[random];
      this.enemy_bullet.reset(shooter.body.x, shooter.body.y);
      this.game.physics.arcade.moveToObject(this.enemy_bullet, this.player, 120);
      this.enemy_bullet_time = game.time.now + 2000;
    }
  }
  collisionEnemy(enemy, object) {
    object.kill();
    enemy.kill();

const explosion = this.explosions.getFirstExists(false);
explosion.reset(object.body.x, object.body.y);
explosion.play('kaboom', 30, false, true);
  }
  collisionPlayer(player, object) {
    object.kill();

const explosion = this.explosions.getFirstExists(false);
explosion.reset(object.body.x, object.body.y);
explosion.play('kaboom', 30, false, true);

    this.player_lives -= 1;
    this.player.body.x = 466;
    this.player.body.y = 556;
    this.player.angle = 0;
    if (this.player_lives < 0) { this.player.kill(); }
  }
  resetObject(bullet) {
    bullet.kill();
  }
  collisionHandler(object, bullet) {
    object.kill();
  }

  render () {
  }
}
