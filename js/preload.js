var TurboSnake = TurboSnake || {};

TurboSnake.Preload = function() {};

TurboSnake.Preload.prototype = {
    preload: function() {
        this.load.spritesheet('snake', 'assets/snake.png', 48, 48);
        this.load.tilemap('map', 'assets/home.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/TilesSet.png');
        this.load.image('computer', 'assets/computer.png');
    },
    create: function() {
        this.state.start('Home');
    }
};