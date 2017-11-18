import tank_img from './assets/tank.png';
import wall_img from './assets/wall.png';
import bullet_img from './assets/bullet.png';
import enemy_img from './assets/enemy.png';
import explode_img from './assets/explode.png';
import enemy_bullet_img from './assets/enemy_bullet.png';


export default function () {
  function setupPhaser() {
    /* eslint-disable global-require */
    window.PIXI = require('phaser/build/custom/pixi');
    window.p2 = require('phaser/build/custom/p2');
    window.Phaser = require('phaser/build/custom/phaser-split');
    /* eslint-enable global-require */
    return window.Phaser;
  }

  const Phaser = setupPhaser();
  const game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', { preload, create, update });

  function preload() {
    game.load.image('tank', tank_img);
    game.load.image('wall', wall_img);
    game.load.image('bullet', bullet_img);
    game.load.image('enemy', enemy_img);
    game.load.image('enemy_bullet', enemy_bullet_img);
    game.load.spritesheet('kaboom', explode_img, 68, 68);
  }

  let player;
  let player_dir;
  let player_lives = 3;
  let bullet;
  let bullets;
  let bullet_time = 0;
  let enemy_bullet;
  let enemy_bullets;
  let enemy_bullet_time = 5000;
  let enemies;
  const livingEnemies = [];
  let cursors;
  let walls;
  let explosions;

  function create() {
    game.stage.backgroundColor = '#123';

    // player's tank
    player = game.add.sprite(416, 556, 'tank');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.anchor.set(0.5);

    // enemies
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 10; i++) {
      const new_enemy = enemies.create(game.world.randomX, game.world.randomY, 'enemy');
      new_enemy.anchor.set(0.5);
      new_enemy.angle = game.rnd.integerInRange(0, 3) * 90;
      new_enemy.body.immovable = false;
    }

    // walls
    walls = game.add.group();
    walls.enableBody = true;
    walls.physicsBodyType = Phaser.Physics.ARCADE;
    for (i = 0; i < 3; i++) {
      const new_wall = walls.create(368 + i * 32, 480, 'wall');
      new_wall.body.immovable = true;
    }

    // bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (i = 0; i < 20; i++) {
      const new_bullet = bullets.create(0, 0, 'bullet');
      new_bullet.name = `bullet${i}`;
      new_bullet.exists = false;
      new_bullet.visible = false;
      new_bullet.checkWorldBounds = true;
      new_bullet.events.onOutOfBounds.add(resetBullet, this);
    }

    // enemy_bullets
    enemy_bullets = game.add.group();
    enemy_bullets.enableBody = true;
    enemy_bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (i = 0; i < 20; i++) {
      const new_enemy_bullet = enemy_bullets.create(0, 0, 'enemy_bullet');
      new_enemy_bullet.name = `enemy_bullet${i}`;
      new_enemy_bullet.exists = false;
      new_enemy_bullet.visible = false;
      new_enemy_bullet.checkWorldBounds = true;
      new_enemy_bullet.events.onOutOfBounds.add(resetBullet, this);
    }

    // explosion
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(boom, this);

    // contors
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  }

  function boom(enemy) {
    enemy.anchor.x = 0;
    enemy.anchor.y = 0;
    enemy.animations.add('kaboom');
  }

  function update() {
    // collisions
    game.physics.arcade.overlap(bullets, enemies, collisionEnemy, null, this);
    game.physics.arcade.overlap(bullets, enemy_bullets, collisionEnemy, null, this);
    game.physics.arcade.overlap(enemy_bullets, player, collisionPlayer, null, this);
    game.physics.arcade.overlap(bullets, walls, collisionHandler, null, this);
    game.physics.arcade.overlap(enemy_bullets, walls, collisionHandler, null, this);

    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(enemies, enemies);
    game.physics.arcade.collide(enemies, walls);
    game.physics.arcade.collide(player, enemies);

    if (player.alive) {
      player.body.velocity.setTo(0, 0);

      if (cursors.left.isDown) {
        player_dir = 'left';
        player.body.velocity.x = -100;
        player.angle = 270;
      } else if (cursors.right.isDown) {
        player_dir = 'right';
        player.body.velocity.x = 100;
        player.angle = 90;
      } else if (cursors.up.isDown) {
        player_dir = 'up';
        player.body.velocity.y = -100;
        player.angle = 0;
        // enemyFires();
      } else if (cursors.down.isDown) {
        player_dir = 'down';
        player.body.velocity.y = 100;
        player.angle = 180;
      }
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        fireBullet();
      }
      if (game.time.now > enemy_bullet_time) {
        enemyFires();
      }
    }
  }

  function fireBullet() {
    if (game.time.now > bullet_time) {
      bullet = bullets.getFirstExists(false);

      if (bullet) {
        if (player_dir === 'up') {
          bullet.reset(player.x - 18, player.y - 30);
          bullet.body.velocity.y = -200;
        }
        if (player_dir === 'down') {
          bullet.reset(player.x - 18, player.y);
          bullet.body.velocity.y = +200;
        }
        if (player_dir === 'left') {
          bullet.reset(player.x - 30, player.y - 18);
          bullet.body.velocity.x = -200;
        }
        if (player_dir === 'right') {
          bullet.reset(player.x, player.y - 18);
          bullet.body.velocity.x = +200;
        }
        bullet_time = game.time.now + 500;
      }
    }
  }

  function enemyFires() {
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
  }

  function resetBullet(bullet) {
    bullet.kill();
  }

  function collisionEnemy(enemy, object) {
    object.kill();
    enemy.kill();

    const explosion = explosions.getFirstExists(false);
    explosion.reset(object.body.x, object.body.y);
    explosion.play('kaboom', 30, false, true);
  }

  function collisionPlayer(player, object) {
    object.kill();

    const explosion = explosions.getFirstExists(false);
    explosion.reset(object.body.x, object.body.y);
    explosion.play('kaboom', 30, false, true);

    player_lives -= 1;
    player.body.x = 400;
    player.body.y = 540;
    player.angle = 0;

    if (player_lives < 0) { player.kill(); }
  }

  function collisionHandler(object, bullet) {
    object.kill();
  }
}
