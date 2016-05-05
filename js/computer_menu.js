var TurboSnake = TurboSnake || {};

TurboSnake.Computer_Menu = function() {};

TurboSnake.Computer_Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#707070';

        this.game.add.text(10,10, '<- Press space to go back.', {font:'14px Arial', fill: '#fff'});

        this.game.add.text(20,50, 'View Finances\n', {font:'14px Arial', fill: '#fff'});
        this.game.add.text(20, 90, 'Buy Upgrades', {font: '14px Arial', fill: '#fff'}); 

        var button_finance = this.game.add.button(100, 200, 'finance_button', this.finance, this);
        button_finance.scale.x = .5;
        button_finance.scale.y = .5;

        var button_buy = this.game.add.button(300, 200, 'buy_button', this.buy, this);
        button_buy.scale.setTo(.5);

        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },
    update: function() {
        if(this.cursors.space.isDown) {
            this.game.state.start('Home');
        }
    },
    finance: function() {
        this.game.state.start('Finance_Menu');
    },
    buy: function() {
        this.game.state.start('Buy_Menu');
    }
};