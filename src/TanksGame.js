var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('tank', 'http://localhost/src/tank.png');
    game.load.image('wall', 'http://localhost/src/wall.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#123';

    player = game.add.sprite(200, 200, 'tank');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;

    wall = game.add.sprite(100, 200, 'wall');
    game.physics.enable(wall, Phaser.Physics.ARCADE);
    wall.body.immovable = true;

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    game.physics.arcade.collide(player, wall);

        if (player.alive) {
        player.body.velocity.setTo(0, 0);

        if (cursors.left.isDown) {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 200;
        }
        else if (cursors.up.isDown) {
            player.body.velocity.y = -200;
        }
        else if (cursors.down.isDown) {
            player.body.velocity.y = 200;
        }
    }

}
