var TurboSnake = TurboSnake || {};

TurboSnake.Preload = function() {};

TurboSnake.Preload.prototype = {
    preload: function() {
        var height = 98, width = 377;
        this.load.spritesheet('snake_home', 'assets/snake.png', 30, 30);
        this.load.tilemap('map', 'assets/HomeTiles_2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/TilesSet.png');
        this.load.image('neo', 'assets/Sidewalk_dark.png');
        this.load.image('computer', 'assets/computer.png');
        this.load.spritesheet('finance_button', 'assets/finance_sprite.png',282,193);
        this.load.spritesheet('buy_power', 'assets/buy_powerups_sprite.png',282,193);
        this.load.spritesheet('leader', 'assets/leaderboard_sprite.png',width,height);
        this.load.spritesheet('back', 'assets/back_sprite.png',154,105);
        this.load.spritesheet('buy_button', 'assets/buy_sprite.png', 191, 97);
        this.load.spritesheet('pay_debt_button', 'assets/pay_debt_sprite.png', 327, 130);
    },
    create: function() {
        this.state.start('Home');
    }
};