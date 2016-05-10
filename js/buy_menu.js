var TurboSnake = TurboSnake || {};

TurboSnake.Buy_Menu = function() {
    this.intro_string = 'You can purchase powerups here!';
    this.fund_string = 'Avaliable Today:              Funds : ';
    this.intro = null;
    this.buttons = null;

    this.title_style = { font: "bold 15px sans-serif", fill: "#46c0f9", align: "center" };
    this.default_style = { font: "bold 15px sans-serif", fill: "#fff", align: "center" };
    this.red = { font: "bold 15px sans-serif", fill: "#B0171F", align: "center" };


    var self = this;
    powerupsArr.forEach(function(power, ind){
        self[power + 'text'] = null;
        self[power + 'buy_text'] = null;
    });
};

TurboSnake.Buy_Menu.prototype = {
    create: function() {
        var self = this;
        this.game.stage.backgroundColor = '#061f27';

        this.game.add.text(10,10, '<- Press space to go back.', this.default_style);        

        this.buttons = this.game.add.group();

        avaliablePowerups.forEach(function(power, ind){
            self[power + 'buy_text'] = self.game.add.text(20, 100 + 115*ind, powerupInfo[power].name + ' ($'+ powerupInfo[power].cost + ')',self.default_style);
	        var button = self.game.add.button(25, 120 + 115*ind, 'buy_button', self.buy(power), self, 1, 0, 2);
            button.scale.setTo(.5, .4);
            self.buttons.add(button);
        });

        this.game.add.text(360, 20, "Inventory:", this.title_style);
        powerupsArr.forEach(function(power, ind){
            self.game.add.text(360, 50 + 50*ind, powerupInfo[power].name, self.title_style);
            self[power + 'text'] = self.game.add.text(400, 75 + 50*ind, 'Avaliable : ' + powerupInfo[power].count , self.default_style);
        });
        this.intro = this.game.add.text(20,40, this.intro_string, this.default_style);
        this.funds = this.game.add.text(20,70, this.fund_string + credit , this.default_style);
        
        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },
    update: function() {
        if(this.cursors.space.isDown) {
            this.game.state.start('Computer_Menu');
        }
        this.updateInv();
        this.funds.text = this.fund_string + credit;
    },
    updateInv: function(){
        var self = this;
        powerupsArr.forEach(function(power, ind){
            self[power + 'text'].text = 'Avaliable : ' + powerupInfo[power].count;
            if(self[power + 'buy_text']){
                self[power + 'buy_text'].text = powerupInfo[power].name + ' ($'+ powerupInfo[power].cost + ')';   
            }
        });
    },
    disable: function(){
        var self = this;
        this.buttons.forEach(function(button){
            button.input.enabled = false;
        });
    },
    enable: function(){
        var self = this;
        this.buttons.forEach(function(button){
            button.input.enabled = true;
        });
    },
    buy: function(powerup) {
    	return function(){
    		cost = powerupInfo[powerup].cost;
    		if(credit >= cost){
    			credit -= cost;
    		} else {
                cost -= credit;
                credit = 0;
                debt += cost;
            }
            this.disable();
            this.game.time.events.add(250, this.enable, this);

            powerupInfo[powerup].cost = Math.round(powerupInfo[powerup].cost * 1.1);
            powerupInfo[powerup].count += 1;
    	}
    }
};