var TurboSnake = TurboSnake || {};

TurboSnake.Computer_Menu = function() {};

TurboSnake.Computer_Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#707070';
        this.game.add.text(20,50, 'View Finances\n', {font:'14px Arial', fill: '#fff'});
        this.game.add.text(20, 90, 'Buy Upgrades', {font: '14px Arial', fill: '#fff'}); 

        button_finance = this.game.add.button(16, 500, 'finance_button', this.finance, this);

        button_buy = this.game.add.button(160, 500, 'buy_button', this.buy, this);
        
        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(32);

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