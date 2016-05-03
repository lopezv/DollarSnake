var TurboSnake = TurboSnake || {};

TurboSnake.Game_Over = function() {};


TurboSnake.Game_Over.prototype = {


    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        this.game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {
        line1 = new Phaser.Line(0,0,0,0);

        // Create button to start game similar to the main menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Give reason why game ended
        var reason_text;
        switch (game_over_reason) {
            case "time":
                reason_text = "TIME'S UP!";
                break;
            case "wall_collision":
                reason_text = "YOU RAN INTO A WALL :(";
                break;
            case "self_collision":
                reason_text = "YOU HIT YOURSELF! OUCH!";
                break;
            default:
                break;
        }

        var reason = this.game.add.text(300, 310, reason_text, { font: "bold 15px sans-serif", fill: "#ffffff", align: "center"});
        reason.anchor.x = 0.5;

        // Last Score Info.
        var earned_money = (score * multiplier).formatMoney(2);
        this.game.add.text(210, 350, "YOU EARNED", { font: "bold 15px sans-serif", fill: "#46c0f9", align: "center"});
        this.game.add.text(340, 350, '$ ' + earned_money, { font: "bold 15px sans-serif", fill: "#fff", align: "center" });

        // add spacebar
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    
    update: function() {
        // Start on space down
        if(this.cursors.space.isDown){
            this.startGame();
        }
    },

    startGame: function () {
        // increase debt
        debt *= 1.1;

        // increase credit
        credit += score*1000;

        // generate new powerups
        getRandomPowerUps();

        // Change the state to the actual game.
        this.state.start('Home');

    }

};

    Number.prototype.formatMoney = function(c, d, t){
        var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }