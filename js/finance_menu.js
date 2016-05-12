var TurboSnake = TurboSnake || {};

TurboSnake.Finance_Menu = function() {
    this.creditString = 'Your current cash is : $';
    this.debtString = 'Your current debt is : $';
    this.style = {font:'bold 14px Arial', fill: '#FFFFFF'};

    this.key_style = { font: "bold 15px sans-serif", fill: "#46c0f9", align: "center" };
    this.object_style = { font: "bold 15px sans-serif", fill: "#fff", align: "center" };
    this.red = { font: "bold 15px sans-serif", fill: "#B0171F", align: "center" };
};

TurboSnake.Finance_Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#061f27';

        var back = this.game.add.button(10, 10, 'back', this.back, this, 1, 0, 2);
        back.scale.setTo(.4,.3);

        this.summary();

        var button_pay = this.game.add.button(100, 200, 'pay_debt_button', this.pay_debt, this, 1, 0, 2);
        button_pay.scale.setTo(.5);
        
        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },
    update: function() {
        if(this.cursors.space.isDown) {
            this.game.state.start('Computer_Menu');
        }

        this.creditText.text = (credit).formatMoney(2);
        this.debtText.text = '- ' + (debt).formatMoney(2);
    },
    pay_debt: function() {
        var init_credit = credit;
        credit = Math.max(0, credit - debt);
        debt = Math.max(0, debt-init_credit);        
    },
    summary: function(){
        var worth = this.game.add.text(20,50, this.creditString , this.key_style);
        this.creditText = this.add.text(30 + worth.width, 50, (credit).formatMoney(2), this.object_style);

        var debt_text = this.game.add.text(20,100, this.debtString, this.key_style);
        this.debtText = this.add.text(30 + debt_text.width,100, '-' + (debt).formatMoney(2), this.red);

    },
    back : function(){
        this.game.state.start('Computer_Menu');
    }
};