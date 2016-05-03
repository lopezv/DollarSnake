var TurboSnake = TurboSnake || {};

TurboSnake.Buy_Menu = function() {
    this.intro_string = 'You can purchase powerups here!\nAvaliable Today:              Funds : ';
    this.intro = null;
};

TurboSnake.Buy_Menu.prototype = {
    create: function() {
        var self = this;
        this.game.stage.backgroundColor = '#707070';
        this.game.add.text(10,10, '< Press space to go back.', {font:'14px Arial', fill: '#fff'});        
        this.intro = this.game.add.text(20,50, this.intro_string + credit , {font:'14px Arial', fill: '#fff'});


        var buttons = this.game.add.group();

        avaliablePowerups.forEach(function(power, ind){
            self.game.add.text(20, 100 + 75*ind, powerupInfo[power].name + ' ($'+ powerupInfo[power].cost + ')', {font:'14px Arial', fill: '#fff'});
	        var button = self.game.add.button(25, 125 + 75*ind, 'buy_with_cash', self.buy(power), self),
	        button_debt = self.game.add.button(200, 125 + 75*ind, 'buy_with_debt', self.debt(power), self);
            button.scale.setTo(.5,.25);
            button_debt.scale.setTo(.5,.25);
            buttons.add(button_debt);
            buttons.add(button);
        });

        //buttons.scale.setTo(.5,.25);
        
        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },
    update: function() {
        if(this.cursors.space.isDown) {
            this.game.state.start('Computer_Menu');
        }

        this.intro.text = this.intro_string + credit;
    },
    buy: function(powerup) {
    	return function(){
    		cost = powerupInfo[powerup].cost;
    		if(credit >= cost){
    			credit -= cost;
    			powerupInfo[powerup].count += 1
    		}
    	}
    },
    debt: function(powerup) {
    	return function(){
   			debt += powerupInfo[powerup].cost;;
  			powerupInfo[powerup].count += 1
    	}
    }

};