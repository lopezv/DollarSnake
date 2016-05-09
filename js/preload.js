var TurboSnake = TurboSnake || {};

TurboSnake.Preload = function() {};

TurboSnake.Preload.prototype = {
    preload: function() {
        this.load.spritesheet('snake_home', 'assets/snake.png', 30, 30);
        this.load.tilemap('map', 'assets/home.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/TilesSet.png');
        this.load.image('computer', 'assets/computer.png');
        this.load.image('background', 'assets/bliss.png');
        this.load.spritesheet('finance_button', 'assets/finance_sprite.png',282,193);
        this.load.spritesheet('buy_button', 'assets/buy_button.png', 282, 193);
        this.load.spritesheet('pay_debt_button', 'assets/pay_debt_sprite.png', 282, 193);
    },
    create: function() {
        this.state.start('Home');
    }
};