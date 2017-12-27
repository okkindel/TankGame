import Phaser from 'phaser'
import Player from '../sprites/Player'
import BasicTank from '../sprites/Tanks/BasicTank'
import FastTank from '../sprites/Tanks/FastTank'
import IronTank from '../sprites/Tanks/IronTank'
import Eagle from '../sprites/Eagle'
import Player_Bullets from '../sprites/Player_Bullets'
import Enemy_Bullets from '../sprites/Enemy_Bullets'
import Walls from '../sprites/Walls'
import Brick from '../sprites/Brick'
import Water from '../sprites/Water'
import Leaves from '../sprites/Leaves'
import Map from '../map'
import BonusSpeedUp from '../sprites/Bonuses/BonusSpeedUp';
import BonusSlowUp from '../sprites/Bonuses/BonusSlowUp';
import BonusImmortality from '../sprites/Bonuses/BonusImmortality';

export default class extends Phaser.State {

  constructor() {
    super()
    this.enemy_bullet_time = 2000;
    this.enemy_spawn_interval = 5000;
    this.map_counter = 1;
    this.bullet_time = 0;
    this.last_time_spawn = 0;
    this.next_bonus = 0;
  }

  init() { }
  preload() { }
  create() {

    //MAP LOADING
    this.map = new Map();
    this.map_list = require("../maps/map_list.json").list;
    this.map.load_map(require('../maps/' + this.map_list[this.map_counter]));
    console.log(this.map)

    //WATER
    this.water_position = this.map.get_water_array();
    this.water = this.game.add.group();

    for (i = 0; i < this.water_position.length; i++) {
      this.water_drop = new Water({
        game: this.game,
        x: this.water_position[i].x * 36,
        y: this.water_position[i].y * 36,
        asset: 'water_img'
      })
      this.water.add(this.water_drop);
    }

    //PLAYER TANK
    this.player_start_point = this.map.get_start_point();
    this.player = new Player({
      game: this.game,
      x: this.player_start_point.x * 36 + 18,
      y: this.player_start_point.y * 36 + 18,
      asset: 'tank_img'
    })
    this.game.add.existing(this.player)

    //BasicTank TANKS
    this.enemy_number = this.map.get_enemy_counter();
    this.spawn_counter = this.map.get_spawn_counter() - 1;
    this.enemy_spawn_point = this.map.get_enemy_spawn_point();
    this.enemies = this.game.add.group();
    this.addNewEnemy();

    //EAGLE
    this.eagle_position = this.map.get_eagle_point();
    this.eagle = new Eagle({
      game: this.game,
      x: this.eagle_position.x * 36,
      y: this.eagle_position.y * 36,
      asset: 'eagle_img'
    })
    this.game.add.existing(this.eagle)

    //BRICKS
    this.brick_position = this.map.get_brick_array();
    this.bricks = this.game.add.group();

    //Bonus
    this.bonuses = this.game.add.group();

    //LEFT UP
    for (i = 0; i < this.brick_position.length; i++) {
      this.brick = new Brick({
        game: this.game,
        x: this.brick_position[i].x * 36,
        y: this.brick_position[i].y * 36,
        asset: 'small_wall_1'
      })
      this.bricks.add(this.brick);
    }
    //RIGHT UP
    for (i = 0; i < this.brick_position.length; i++) {
      this.brick = new Brick({
        game: this.game,
        x: this.brick_position[i].x * 36 + 18,
        y: this.brick_position[i].y * 36,
        asset: 'small_wall_2'
      })
      this.bricks.add(this.brick);
    }
    //LEFT DOWN
    for (i = 0; i < this.brick_position.length; i++) {
      this.brick = new Brick({
        game: this.game,
        x: this.brick_position[i].x * 36,
        y: this.brick_position[i].y * 36 + 18,
        asset: 'small_wall_3'
      })
      this.bricks.add(this.brick);
    }
    //RIGHT DOWN
    for (i = 0; i < this.brick_position.length; i++) {
      this.brick = new Brick({
        game: this.game,
        x: this.brick_position[i].x * 36 + 18,
        y: this.brick_position[i].y * 36 + 18,
        asset: 'small_wall_4'
      })
      this.bricks.add(this.brick);
    }

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

    //LEAVES
    this.leaves_position = this.map.get_leaves_array();
    this.leaves = this.game.add.group();

    for (i = 0; i < this.leaves_position.length; i++) {
      this.leaf = new Leaves({
        game: this.game,
        x: this.leaves_position[i].x * 36,
        y: this.leaves_position[i].y * 36,
        asset: 'leaves_img'
      })
      this.leaves.add(this.leaf);
    }

    //PLAYER BULLETS
    this.bullets = this.game.add.group();
    for (i = 0; i < 20; i++) {
      this.bullet = new Player_Bullets({
        game: this.game,
        asset: 'bullet_img'
      })
      this.bullet.events.onOutOfBounds.add(this.resetObject, this);
      this.bullets.add(this.bullet);
    }

    //TANK BULLETS
    this.enemy_bullets = this.game.add.group();
    for (i = 0; i < 20; i++) {
      this.enemy_bullet = new Enemy_Bullets({
        game: this.game,
        asset: 'enemy_bullet_img'
      })
      this.enemy_bullet.events.onOutOfBounds.add(this.resetObject, this);
      this.enemy_bullets.add(this.enemy_bullet);
    }

    //LIVES
    this.lives = this.game.add.group();

    for (var i = 0; i < 3; i++) {
      this.icon = this.lives.create(this.game.world.width - 95 + (35 * i), 22, 'tank_img');
      this.icon.anchor.setTo(0.5, 0.5);
      this.icon.angle = 90;
      this.icon.scale.setTo(0.9, 0.9);
      this.icon.alpha = 0.8;
    }

    //EXPLOSIONS
    this.explosions = this.game.add.group();
    this.explosions.createMultiple(30, 'explode_img');
    this.explosions.forEach(this.big_boom, this);

    //EXPLOSION SMALL
    this.small_explode = this.game.add.group();
    this.small_explode.createMultiple(30, 'explode_small_img');
    this.small_explode.forEach(this.small_boom, this);

    //APPEAR
    this.appear = this.game.add.group();
    this.appear.createMultiple(30, 'appear_img');
    this.appear.forEach(this.appear_tank, this);

    //SOUNDS
    this.shot_sound = this.game.add.audio('shot_sound');
    this.bonus_sound = this.game.add.audio('bonus_sound');
    this.win_sound = this.game.add.audio('win_sound');
    this.lose_sound = this.game.add.audio('lose_sound');
    this.explode_sound = this.game.add.audio('explode_sound');
    this.hit_sound = this.game.add.audio('hit_sound');

    //CURSORS
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  }

  big_boom(object) {
    object.anchor.x = 0.5;
    object.anchor.y = 0.5;
    object.animations.add('kaboom');
  }

  small_boom(object) {
    object.anchor.x = 0.5;
    object.anchor.y = 0.5;
    object.animations.add('small_kaboom');
  }

  appear_tank(object) {
    object.anchor.x = 0.5;
    object.anchor.y = 0.5;
    object.animations.add('appearing');
  }

  update() {

    //ADD NEW ENEMIES
    if (this.enemy_number > 0 && (this.game.time.now - this.last_time_spawn) > this.enemy_spawn_interval) {
      this.addNewEnemy();
      const apearing = this.appear.getFirstExists(false);
      apearing.reset(this.enemy.x, this.enemy.y);
      apearing.play('appearing', 60, false, true);
    }

    if (this.game.time.now > this.next_bonus) {
      this.addBonus();
      this.next_bonus = this.game.time.now + ((Math.random() * 20000) + 10000);
    }


    //COLLISIONS
    this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionTank, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.enemy_bullets, this.collisionHandler, null, this);
    this.game.physics.arcade.overlap(this.enemy_bullets, this.player, this.collisionPlayer, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.bricks, this.collisionHandler, null, this);
    this.game.physics.arcade.overlap(this.enemy_bullets, this.bricks, this.collisionHandler, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.walls, this.collision, null, this);
    this.game.physics.arcade.overlap(this.enemy_bullets, this.walls, this.collision, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.eagle, this.collisionEagle, null, this);
    this.game.physics.arcade.overlap(this.enemy_bullets, this.eagle, this.collisionEagle, null, this);
    this.game.physics.arcade.overlap(this.player, this.enemies, this.simpleCollision, null, this);
    this.game.physics.arcade.overlap(this.player, this.bonuses, this.simpleBonusCollision, null, this);

    this.game.physics.arcade.collide(this.player, this.enemies);
    this.game.physics.arcade.collide(this.enemies, this.enemies);
    this.game.physics.arcade.collide(this.player, this.bricks);
    this.game.physics.arcade.collide(this.enemies, this.bricks);
    this.game.physics.arcade.collide(this.player, this.walls);
    this.game.physics.arcade.collide(this.enemies, this.walls);
    this.game.physics.arcade.collide(this.player, this.water);
    this.game.physics.arcade.collide(this.enemies, this.water);
    this.game.physics.arcade.collide(this.player, this.eagle);
    this.game.physics.arcade.collide(this.enemies, this.eagle);


    if (this.player.alive) {

      //MOVING
      this.player.body.velocity.setTo(0, 0);

      if (this.cursors.left.isDown) {
        this.player.moveLeft();
      }
      else if (this.cursors.right.isDown) {
        this.player.moveRight();
      }
      else if (this.cursors.up.isDown) {
        this.player.moveUp();
      }
      else if (this.cursors.down.isDown) {
        this.player.moveDown();
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.fireBullet();
      }
      if (this.game.time.now > this.enemy_bullet_time) {
        this.enemyFires();
      }
    }
  }

  addNewEnemy() {

    this.last_time_spawn = this.game.time.now;
    let random = this.game.rnd.integerInRange(0, this.spawn_counter)
    let type = this.game.rnd.integerInRange(0, 15)

    if (type < 9) {
      this.enemy = new BasicTank({
        game: this.game,
        x: this.enemy_spawn_point[random].x * 36 + 18,
        y: this.enemy_spawn_point[random].y * 36 + 18,
        asset: 'enemy_red_img',
        Game: this
      })
    } else if (type < 12) {
      this.enemy = new FastTank({
        game: this.game,
        x: this.enemy_spawn_point[random].x * 36 + 18,
        y: this.enemy_spawn_point[random].y * 36 + 18,
        asset: 'enemy_blue_img',
        Game: this
      })
    } else {
      this.enemy = new IronTank({
        game: this.game,
        x: this.enemy_spawn_point[random].x * 36 + 18,
        y: this.enemy_spawn_point[random].y * 36 + 18,
        asset: 'enemy_white_img',
        Game: this
      })
    }
    this.enemies.add(this.enemy);
    this.enemy_number -= 1;
    console.log(this.enemy_number);
  }

  addBonus() {
    let random = this.game.rnd.integerInRange(0, 15)
    if (random < 5) {
      this.bonus = new BonusSpeedUp({
        game: this.game,
        x: this.game.rnd.integerInRange(50, 850),
        y: this.game.rnd.integerInRange(50, 550),
        asset: 'bonus_speed',
        lifeTime: 10000
      });
    }
    else if (random < 10) {
      this.bonus = new BonusSlowUp({
        game: this.game,
        x: this.game.rnd.integerInRange(50, 850),
        y: this.game.rnd.integerInRange(50, 550),
        asset: 'bonus_slow',
        lifeTime: 10000
      });
    } else {
      this.bonus = new BonusImmortality({
        game: this.game,
        x: this.game.rnd.integerInRange(50, 850),
        y: this.game.rnd.integerInRange(50, 550),
        asset: 'bonus_immortal',
        lifeTime: 10000
      });
    }
    this.bonuses.add(this.bonus);
  }

  simpleCollision(tank, enemy) {
    tank.body.velocity.setTo(0, 0);
    enemy.body.velocity.setTo(0, 0)
  }

  simpleBonusCollision(player, bonus) {
    this.bonus_sound.play();
    bonus.modify(player);
    bonus.kill();
  }

  fireBullet() {

    const explosion = this.small_explode.getFirstExists(false);
    if (this.game.time.now > this.bullet_time) {
      this.bullet = this.bullets.getFirstExists(false);
      this.shot_sound.play();

      if (this.bullet) {
        if (this.player.getDirection() === 'up') {
          this.bullet.reset(this.player.x - 4, this.player.y - 20);
          explosion.reset(this.player.x, this.player.y - 20);
          this.bullet.body.velocity.y = -200;
        }
        if (this.player.getDirection() === 'down') {
          this.bullet.reset(this.player.x - 4, this.player.y + 20);
          explosion.reset(this.player.x, this.player.y + 20);
          this.bullet.body.velocity.y = +200;
        }
        if (this.player.getDirection() === 'left') {
          this.bullet.reset(this.player.x - 20, this.player.y - 4);
          explosion.reset(this.player.x - 20, this.player.y);
          this.bullet.body.velocity.x = -200;
        }
        if (this.player.getDirection() === 'right') {
          this.bullet.reset(this.player.x + 20, this.player.y - 4);
          explosion.reset(this.player.x + 20, this.player.y);
          this.bullet.body.velocity.x = +200;
        }
        explosion.play('small_kaboom', 80, false, true);
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
      const explosion = this.small_explode.getFirstExists(false);
      if (shooter.getDirection() == 'up') {
        this.enemy_bullet.reset(shooter.x - 4, shooter.y - 20);
        explosion.reset(shooter.x, shooter.y - 20);
        this.enemy_bullet.body.velocity.y = -120;
      }
      if (shooter.direction == 'down') {
        this.enemy_bullet.reset(shooter.x - 4, shooter.y + 20);
        explosion.reset(shooter.x, shooter.y + 20);
        this.enemy_bullet.body.velocity.y = +120;
      }
      if (shooter.direction == 'left') {
        this.enemy_bullet.reset(shooter.x - 20, shooter.y - 4);
        explosion.reset(shooter.x - 20, shooter.y);
        this.enemy_bullet.body.velocity.x = -120;
      }
      if (shooter.direction == 'right') {
        this.enemy_bullet.reset(shooter.x + 20, shooter.y - 4);
        explosion.reset(shooter.x + 20, shooter.y);
        this.enemy_bullet.body.velocity.x = +120;
      }
      explosion.play('small_kaboom', 80, false, true);
      this.enemy_bullet_time = this.game.time.now + 750 / Math.sqrt(this.livingEnemies.length);
    }

    if (this.enemy_number == 0 && this.livingEnemies.length == 0) {
      if (this.map_list.length >= this.map_counter)
        this.map_counter += 1;
      else
        this.map_counter = 0;
      this.win_sound.play();
      this.state.start('NextLevel');
    }
  }

  collisionEagle(eagle, object) {
    object.kill();
    eagle.kill();

    const explosion = this.explosions.getFirstExists(false);
    explosion.reset(object.x, object.y);
    explosion.play('kaboom', 30, false, true);
    this.map_counter = 0;
    this.lose_sound.play();
    this.state.start('GameOver');
  }

  collisionHandler(bullet, object) {
    object.kill();
    bullet.kill();
    this.hit_sound.play();

    const explosion = this.explosions.getFirstExists(false);
    explosion.reset(object.x, object.y);
    explosion.play('kaboom', 30, false, true);
  }

  collisionTank(object, enemy) {
    this.explode_sound.play();
    object.kill();
    enemy.live_counter -= 1;
    if (enemy.live_counter == 0)
      enemy.kill();
    this.game.score.addScore(enemy)


    const explosion = this.explosions.getFirstExists(false);
    explosion.reset(object.x, object.y);
    explosion.play('kaboom', 30, false, true);
  }

  collisionPlayer(player, object) {
    object.kill();
    if (!player.immortality) {
      this.live = this.lives.getFirstAlive();
      if (this.live) {
        this.live.kill();
      }
    }

    const explosion = this.explosions.getFirstExists(false);
    explosion.reset(object.body.x, object.body.y);
    explosion.play('kaboom', 30, false, true);
    this.explode_sound.play();

    if (!player.immortality) {

      this.player.x = this.player_start_point.x * 36 + 18;
      this.player.y = this.player_start_point.y * 36 + 18;
      this.player.angle = 0;

      if (this.lives.countLiving() < 1) {
        this.player.kill();
        this.map_counter = 0;
        this.lose_sound.play();
        this.state.start('GameOver');
      }
    }
  }

  collision(object, bullet) {
    object.kill();
    this.hit_sound.play();
    const explosion = this.small_explode.getFirstExists(false);
    explosion.reset(object.body.x, object.body.y);
    explosion.play('small_kaboom', 80, false, true);
  }

  resetObject(bullet) {
    bullet.kill();
  }

  render() {
  }
}
