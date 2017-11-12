window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')
const Phaser=window.Phaser;

export default function(){
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update });

    function preload() {
        game.load.image('tank', 'http://localhost/src/tank.png');
        game.load.image('wall', 'http://localhost/src/wall.png');
        game.load.image('bullet', 'http://localhost/src/bullet.png');
    }

    var bullets;
    var bulletTime = 0;
    var bullet;
    var player_dir;
    var player;
    var cursors;
    var wall;

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#123';

        //player's tank
        player = game.add.sprite(200, 200, 'tank');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.anchor.set(0.5);

        //walls
        wall = game.add.sprite(100, 200, 'wall');
        game.physics.enable(wall, Phaser.Physics.ARCADE);
        wall.body.immovable = true;

        //bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 20; i++) {
            var new_bullet = bullets.create(0, 0, 'bullet');
            new_bullet.name = 'bullet' + i;
            new_bullet.exists = false;
            new_bullet.visible = false;
            new_bullet.checkWorldBounds = true;
            new_bullet.events.onOutOfBounds.add(resetBullet, this);
        }

        //contors
        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    }

    function update() {

        game.physics.arcade.collide(player, wall);

        if (player.alive) {
            player.body.velocity.setTo(0, 0);

            if (cursors.left.isDown) {
                player_dir = 'left';
                player.body.velocity.x = -100;
                player.angle = 270;
            }
            else if (cursors.right.isDown) {
                player_dir = 'right';
                player.body.velocity.x = 100;
                player.angle = 90;
            }
            else if (cursors.up.isDown) {
                player_dir = 'up';
                player.body.velocity.y = -100;
                player.angle = 0;
            }
            else if (cursors.down.isDown) {
                player_dir = 'down';
                player.body.velocity.y = 100;
                player.angle = 180;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                fireBullet();
            }
        }
    }

    function fireBullet() {

        if (game.time.now > bulletTime) {
            bullet = bullets.getFirstExists(false);

            if (bullet) {
                if (player_dir == 'up') {
                    bullet.reset(player.x - 18, player.y - 30);
                    bullet.body.velocity.y = -200;
                    bulletTime = game.time.now + 500;
                }
                if (player_dir == 'down') {
                    bullet.reset(player.x - 18, player.y);
                    bullet.body.velocity.y = +200;
                    bulletTime = game.time.now + 500;
                }
                if (player_dir == 'left') {
                    bullet.reset(player.x - 30, player.y - 18);
                    bullet.body.velocity.x = -200;
                    bulletTime = game.time.now + 500;
                }
                if (player_dir == 'right') {
                    bullet.reset(player.x, player.y - 18);
                    bullet.body.velocity.x = +200;
                    bulletTime = game.time.now + 500;
                }
            }
        }
    }

    function resetBullet(bullet) {
        bullet.kill();
    }

    function collisionHandler(bullet, wall) {
        bullet.kill();
        wall.kill();
    }
}