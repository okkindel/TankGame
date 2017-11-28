import Phaser from 'phaser'
import Enemy from '../sprites/Enemy_Tank'
import Player_Bullets from '../sprites/Player_Bullets'
import Enemy_Bullets from '../sprites/Enemy_Bullets'
import Player from '../sprites/Player'
import Walls from '../sprites/Walls'
import Map from '../Map'

export default class extends Phaser.State {

  constructor() {
    super()
    this.bullet_time = 0;
    this.enemy_bullet_time = 2000;
    this.player_lives = 3;
    this.map = new Map();
  }

  init() { }
  preload() { }
  create() {
    //Map loading
    this.map.load_map(require("../maps/map1.json"));
    //PLAYER TANK
    this.player_start_point = this.map.get_start_point();
    this.player = new Player({
      game: this.game,
      x: this.player_start_point.x * 36,
      y: this.player_start_point.y * 36,
      asset: 'tank_img'
    })
    this.game.add.existing(this.player)

    //ENEMY TANKS
    this.enemy_spawn_point = this.map.get_enemy_spawn_point();
    this.enemies = this.game.add.group();
    this.enemy = new Enemy({
      game: this.game,
      x: this.enemy_spawn_point[0].x * 36,
      y: this.enemy_spawn_point[0].y * 36,
      asset: 'enemy_img'
    })
      this.enemies.add(this.enemy);

    //WALLS
    this.walls_position = this.map.get_walls_array();
    this.walls = this.game.add.group();
    for (i = 0; i < this.walls_position.length; i++) {
      this.wall = new Walls({
        game: this.game,
        x: this.walls_position[i].x * 36,
        y: this.walls_position[i].y * 36,
        asset: 'wall_img'
      })
      this.walls.add(this.wall);
    }

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
    for (i = 0; i < 20; i++) {
      this.enemy_bullet = new Enemy_Bullets({
        game: this.game,
        asset: 'enemy_bullet_img'
      })
      this.enemy_bullet.events.onOutOfBounds.add(this.resetObject, this);
      this.enemy_bullets.add(this.enemy_bullet);
    }

    //  Lives
    this.lives = game.add.group();

    for (var i = 0; i < 1; i++) {
      this.icon = this.lives.create(game.world.width - 95 + (35 * i), 22, 'enemy_img');
      this.icon.anchor.setTo(0.5, 0.5);
      this.icon.angle = 90;
      this.icon.scale.setTo(0.9, 0.9);
      this.icon.alpha = 0.4;
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

    //ENEMIES MOVING
    this.enemies.forEachAlive(function (enemy) {
      enemy.move(this.player.x, this.player.y, this.game.time.now);
    }, this);


    //COLLISIONS
    this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionEnemy, null, this);
    game.physics.arcade.overlap(this.bullets, this.enemy_bullets, this.collisionEnemy, null, this);
    game.physics.arcade.overlap(this.enemy_bullets, this.player, this.collisionPlayer, null, this);
    game.physics.arcade.overlap(this.bullets, this.walls, this.collisionHandler, null, this);
    game.physics.arcade.overlap(this.enemy_bullets, this.walls, this.collisionHandler, null, this);

    this.game.physics.arcade.collide(this.player, this.enemies);
    this.game.physics.arcade.collide(this.enemies, this.enemies);
    this.game.physics.arcade.collide(this.player, this.walls);
    this.game.physics.arcade.collide(this.enemies, this.walls);

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
      if (shooter.direction == 4) {
        this.enemy_bullet.reset(shooter.x - 4, shooter.y - 20);
        this.enemy_bullet.body.velocity.y = -120;
      }
      if (shooter.direction == 3) {
        this.enemy_bullet.reset(shooter.x - 4, shooter.y + 20);
        this.enemy_bullet.body.velocity.y = +120;
      }
      if (shooter.direction == 2) {
        this.enemy_bullet.reset(shooter.x - 20, shooter.y - 4);
        this.enemy_bullet.body.velocity.x = -120;
      }
      if (shooter.direction == 1) {
        this.enemy_bullet.reset(shooter.x + 20, shooter.y - 4);
        this.enemy_bullet.body.velocity.x = +120;
      }
      this.enemy_bullet_time = game.time.now + 500;
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

    this.live = this.lives.getFirstAlive();

    if (this.live) {
      this.live.kill();
    }

    const explosion = this.explosions.getFirstExists(false);
    explosion.reset(object.body.x, object.body.y);
    explosion.play('kaboom', 30, false, true);

    this.player_lives -= 1;
    this.player.x = 432;
    this.player.y = 650;
    this.player.angle = 0;
    if (this.lives.countLiving() < 1) {
      this.player.kill();
      this.state.start('GameOver');
    }
  }
  resetObject(bullet) {
    bullet.kill();
  }
  collisionHandler(object, bullet) {
    object.kill();
  }

  render() {
  }
}
