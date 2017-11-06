
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('tank', 'circle.png');


}

var player;
var colision;


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#124184';


    colision = game.add.sprite(100, 200, 'wall');
    game.physics.enable(colision, Phaser.Physics.ARCADE);
    colision.body.collideWorldBounds = true;
    colision.body.immovable = true;


    //  The hero!
    player = game.add.sprite(200, 200, 'tank', 2);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;





    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();

}


function update() {

    game.physics.arcade.collide(player, colision);

    if (player.alive) {
        //  Reset the player, then check for movement keys
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

function render() {

    //pass

}





