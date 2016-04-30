var TurboSnake = TurboSnake || {};

TurboSnake.Finance_Menu = function() {};

TurboSnake.Finance_Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#707070';
        this.game.add.text(20,50, 'Your current credit is : ' + credit, {font:'14px Arial', fill: '#fff'});
        this.game.add.text(20, 90, 'Your current debt is : ' + debt, {font: '14px Arial', fill: '#fff'}); 

        button_pay = this.game.add.button(16, 500, 'pay_button', this.pay_debt, this);
        
        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(32);

    },
    update: function() {
        if(this.cursors.space.isDown) {
            this.game.state.start('Computer_Menu');
        }
    },
    pay_debt: function() {
        credit = Math.max(0, credit - debt);
        debt = Math.max(0, debt-credit);
    }
};