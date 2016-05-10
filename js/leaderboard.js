var TurboSnake = TurboSnake || {};

TurboSnake.Leader_Menu = function() {
    this.creditString = 'Your current cash is : $';
    this.debtString = 'Your current debt is : $';
    this.style = {font:'bold 14px Arial', fill: '#FFFFFF'};

    this.key_style = { font: "bold 15px sans-serif", fill: "#46c0f9", align: "center" };
    this.object_style = { font: "bold 15px sans-serif", fill: "#fff", align: "center" };
    this.red = { font: "bold 15px sans-serif", fill: "#B0171F", align: "center" };
};

TurboSnake.Leader_Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#061f27';
        this.game.add.text(10,10, '<- Press space to go back.', this.style);        
        var oReq = new XMLHttpRequest();
        oReq.onload = function (e) {
            var xhr = e.target;
            console.log('Inside the onload event');
            if (xhr.responseType === 'json') {
                results.innerHTML = xhr.response.message;
            } else {
                results.innerHTML = JSON.parse(xhr.responseText).message;
            }
        };
        oReq.onreadystatechange = function () {
            console.log('Inside the onreadystatechange event with readyState: ' + toReadyStateDescription(oReq.readyState));
        };
        oReq.open('GET', serverUrl, true);
        oReq.responseType = 'json';
        oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0');
        oReq.send();

        this.cursors = {};
        this.cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },
    update: function() {
        if(this.cursors.space.isDown) {
            this.game.state.start('Computer_Menu');
        }
    },
    pay_debt: function() {
    },
    summary: function(){

    }
};