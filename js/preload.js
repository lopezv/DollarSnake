var TurboSnake = TurboSnake || {};

TurboSnake.Preload = function() {};

TurboSnake.Preload.prototype = {
    preload: function() {
        this.load.spritesheet('snake_home', 'assets/snake.png', 30, 30);
        this.load.tilemap('map', 'assets/home.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/TilesSet.png');
        this.load.image('computer', 'assets/computer.png');
        this.load.image('finance_button', 'assets/finance_button.png');
        this.load.image('buy_button', 'assets/buy_button.png');
        this.load.image('pay_debt_button', 'assets/pay_debt_button.png');
        this.load.image('buy_with_debt', 'assets/buy_with_debt.png');
        this.load.image('buy_with_cash', 'assets/buy_with_cash.png');
    },
    create: function() {
        this.state.start('Home');
    }
};