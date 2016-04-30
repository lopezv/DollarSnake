var TurboSnake = TurboSnake || {};

TurboSnake.Buy_Menu = function() {};

TurboSnake.Buy_Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#707070';
        this.game.add.text(20,50, 'You can purchase powerups here!', {font:'14px Arial', fill: '#fff'});

        var self = this;
        avaliablePowerups.forEach(function(power, ind){
	        button = self.game.add.button(16, 500 + 50*ind, power + '_button', self.buy(power), self);
	        button_debt = self.game.add.button(50, 500 + 50*ind, power + '_debt_button', self.debt(power), self);
        });
        
        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(32);

    },
    update: function() {
        if(this.cursors.space.isDown) {
            this.game.state.start('Computer_Menu');
        }
    },
    buy: function(powerup) {
    	return function(){
    		cost = powerupInfo[powerup].cost;
    		if(credit > cost){
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