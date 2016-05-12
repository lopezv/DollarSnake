var TurboSnake = TurboSnake || {};

TurboSnake.Leader_Menu = function() {
    this.creditString = 'Your current cash is : $';
    this.debtString = 'Your current debt is : $';
    this.style = {font:'bold 14px Arial', fill: '#FFFFFF'};

    this.key_style = { font: "bold 15px sans-serif", fill: "#46c0f9", align: "center" };
    this.object_style = { font: "bold 15px sans-serif", fill: "#fff" };
    this.red = { font: "bold 15px sans-serif", fill: "#B0171F"};
};

TurboSnake.Leader_Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#061f27';
        var back = this.game.add.button(10, 10, 'back', this.back, this, 1, 0, 2);
        back.scale.setTo(.4,.3);

        this.game.add.text(25,10 + 60  , 'Name', this.key_style);
        this.game.add.text(225,10 + 60  , 'Days' , this.key_style);
        this.game.add.text(325,10 + 60  , 'Power Ups' , this.key_style);
        this.game.add.text(475,10 + 60  , 'Score' , this.key_style);


        var xmlhttp = new XMLHttpRequest(),
            self=this;

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var myArr = JSON.parse(xmlhttp.responseText);
                self.generateLeader(myArr);
            }
        };
        xmlhttp.open("GET", serverUrl, true);
        xmlhttp.send();
        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);



    },
    update: function() {
        if(this.cursors.space.isDown) {
            this.back();
        }
    },
    pay_debt: function() {
    },
    generateLeader: function(data){
        console.log(data);
        var self = this, i = 1;

        for(var info in data){
            info = data[info];
            var name = self.game.add.text(25,80 + 30 * i , i + '. ' + info.name , self.object_style);
            self.game.add.text(225,80 + 30 * i , info.day , self.object_style);
            self.game.add.text(325,80 + 30 * i ,info.powerups , self.object_style);
            self.game.add.text(475,80 + 30 * i , info.score , self.object_style);
            i++;
        };

    },
    back: function(){
        this.game.state.start('Computer_Menu');
    }
};