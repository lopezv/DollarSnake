var TurboSnake = TurboSnake || {};

TurboSnake.Finance_Menu = function() {
    this.creditString = 'Your current credit is : ';
    this.debtString = 'Your current debt is : ';
};

TurboSnake.Finance_Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#707070';
        this.creditText = this.game.add.text(20,50, this.creditString + credit, {font:'14px Arial', fill: '#fff'});
        this.debtText = this.game.add.text(20, 90, this.debtString + debt, {font: '14px Arial', fill: '#fff'}); 

        var button_pay = this.game.add.button(100, 200, 'pay_debt_button', this.pay_debt, this);
        button_pay.scale.x = .5;
        button_pay.scale.y = .5;
        
        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(32);

    },
    update: function() {
        if(this.cursors.space.isDown) {
            this.game.state.start('Computer_Menu');
        }

        this.creditText.text = this.creditString + credit;
        this.debtText.text = this.debtString + debt;
    },
    pay_debt: function() {
        var init_credit = credit;
        credit = Math.max(0, credit - debt);
        debt = Math.max(0, debt-init_credit);
    }
};