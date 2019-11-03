var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'images/background.png');
    this.load.image('ground', 'images/ground.png');
    this.load.image('grass', 'images/grass_6x1.png');
    this.load.image('stars', 'images/coin_icon.png',16, 16);
    this.load.spritesheet('hero', 
        'images/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create ()
{
    this.add.image(400, 300, 'sky');


    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'grass');
    platforms.create(50, 250, 'grass');
    platforms.create(750, 220, 'grass');


    player = this.physics.add.sprite(100, 150, 'hero');

player.setBounce(0.2);
player.setCollideWorldBounds(true);

this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'hero', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});

player.body.setGravityY(100)
this.physics.add.collider(player, platforms);



cursors = this.input.keyboard.createCursorKeys();

stars = this.physics.add.group({
    key: 'stars',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
});

this.physics.add.collider(stars, platforms);
this.physics.add.overlap(player, stars, collectStar, null, this);

function collectStar (player, star)
{
    star.disableBody(true, true);
}

var score = 0;
var scoreText;

scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}


stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});



}

function update ()
{
    if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}




}