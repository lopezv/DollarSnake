var TurboSnake = TurboSnake || {};

TurboSnake.Finance_Menu = function() {
    this.creditString = 'Your current credit is : $';
    this.debtString = 'Your current debt is : $';
};

TurboSnake.Finance_Menu.prototype = {
    create: function() {
        var background = this.game.add.sprite(0, 0, 'bliss');

        background.width = 600;
        background.height = 450;


        this.game.add.text(10,10, '<- Press space to go back.', {font:'14px Arial', fill: '#fff', stroke:'#000000', strokeThickness: '2'});     

        this.creditText = this.game.add.text(20,50, this.creditString + (credit).formatMoney(2), {font:'14px Arial', fill: '#fff', stroke:'#000000', strokeThickness: '2'});
        this.debtText = this.game.add.text(20, 90, this.debtString +  (debt).formatMoney(2), {font: '14px Arial', fill: '#fff', stroke:'#000000', strokeThickness: '2'}); 

        var button_pay = this.game.add.button(100, 200, 'pay_debt_button', this.pay_debt, this, 0, 1, 2);
        button_pay.scale.setTo(.5);
        
        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },
    update: function() {
        if(this.cursors.space.isDown) {
            this.game.state.start('Computer_Menu');
        }

        this.creditText.text = this.creditString +(credit).formatMoney(2);
        this.debtText.text = this.debtString + (debt).formatMoney(2);
    },
    pay_debt: function() {
        var init_credit = credit;
        credit = Math.max(0, credit - debt);
        debt = Math.max(0, debt-init_credit);        
    }
};