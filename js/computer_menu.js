var TurboSnake = TurboSnake || {};

TurboSnake.Computer_Menu = function() {

    this.style = {font:'bold 14px Arial', fill: '#FFFFFF'};
};

TurboSnake.Computer_Menu.prototype = {
    create: function() {

        this.game.stage.backgroundColor = '#061f27';
        this.game.add.text(10,10, '<- Press space to go back.', this.style);

        this.game.add.text(20,50, 'View Finances', this.style);
        this.game.add.text(20, 90, 'Buy Upgrades', this.style); 

        var button_finance = this.game.add.button(100, 200, 'finance_button', this.finance, this, 1, 0, 2);
        button_finance.scale.setTo(.5);

        var button_buy = this.game.add.button(300, 200, 'buy_button', this.buy, this, 1, 0, 2);
        button_buy.scale.setTo(.5);

        var button_leaderboard = this.game.add.button(200, 300, 'buy_button', this.leaders, this, 1, 0, 2);
        button_leaderboard.scale.setTo(.5);


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
    },
    leaders: function() {
        this.game.state.start('Leader_Menu');
    }

};