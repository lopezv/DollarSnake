var TurboSnake = TurboSnake || {};

TurboSnake.Buy_Menu = function() {
    this.intro_string = 'You can purchase powerups here!';
    this.fund_string = 'Avaliable Today:              Funds : ';
    this.intro = null;
    this.buttons = null;
    this.default_style = {font:'bold 14px Arial', fill: '#FFFFFF', stroke:'black', strokeThickness: '1'};
    this.title_style = {font:'bold 14px Arial', fill: '#000000', stroke:'white', strokeThickness: '1'};

    var self = this;
    powerupsArr.forEach(function(power, ind){
        self[power + 'text'] = null;
    });
};

TurboSnake.Buy_Menu.prototype = {
    create: function() {
        var self = this,
            background = this.game.add.sprite(0, 0, 'bliss');

        background.width = 600;
        background.height = 450;

        this.game.add.text(10,10, '<- Press space to go back.', this.default_style);   

        //define the region
        var top_left_corner = new Phaser.Rectangle(0,0,250,50)
        //listen for pointers
        this.game.input.onDown.add(function(pointer){    
            //this is the test, contains test for a point belonging to a rect definition    
            var inside = top_left_corner.contains(pointer.x,pointer.y);
            //go to main menu   
            this.game.state.start('Computer_Menu');
        });     

        this.buttons = this.game.add.group();

        avaliablePowerups.forEach(function(power, ind){
            self.game.add.text(20, 100 + 115*ind, powerupInfo[power].name + ' ($'+ powerupInfo[power].cost + ')',self.default_style);
	        var button = self.game.add.button(25, 120 + 115*ind, 'buy_button', self.buy(power), self, 0, 1, 2);
            button.scale.setTo(.5, .4);
            self.buttons.add(button);
        });

        this.game.add.text(360, 20, "Inventory:", this.title_style);
        powerupsArr.forEach(function(power, ind){
            self.game.add.text(360, 50 + 50*ind, powerupInfo[power].name, self.default_style);
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
    render: function(){
       // this.debug.text("Time until event: " + this.time.events.duration, 32, 32);

    },
    updateInv: function(){
        var self = this;
        powerupsArr.forEach(function(power, ind){
            self[power + 'text'].text = 'Avaliable : ' + powerupInfo[power].count;
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

            powerupInfo[powerup].count += 1
    	}
    }
};