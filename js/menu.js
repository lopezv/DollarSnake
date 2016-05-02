var TurboSnake = TurboSnake || {};

TurboSnake.Menu = function() {};


TurboSnake.Menu.prototype = {

    preload : function() {
        // Load all the needed resources for the menu.
        this.game.load.image('menu', '../assets/images/menu.png');
    },

    create: function () {

        // Add menu screen.
        // It will act as a button to start the game.
        this.add.button(0, 0, 'menu', this.startGame, this);

        // List powerups
        var powerup = "POWERUP[S]: ";
        var empty = true;

        var keys = Object.keys(powerupInfo);
        for (i = 0; i < keys.length; i++) {
            console.log(powerupInfo[keys[i]]['count']);
            if (powerupInfo[keys[i]]['count'] > 0) {
                if (empty){
                    powerup += powerupInfo[keys[i]]['name'];
                    empty = false;
                } else {
                    powerup += ', ' + powerupInfo[keys[i]]['name'];
                }
            }
        }
        if (empty) {
            powerup += "NONE";
        }

        var powerup_text = this.game.add.text(300, 410, powerup, { font: "bold 15px sans-serif", fill: "#ffffff", align: "center"});
        powerup_text.anchor.x = 0.5;

    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};