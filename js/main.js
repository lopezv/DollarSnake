var TurboSnake = TurboSnake || {};

TurboSnake.game = new Phaser.Game(600, 450, Phaser.AUTO, '');

var credit = 5000,
	debt = 50000,
	day = 1,
	level = 1,
	startX = 300, startY = 400,
	serverUrl = 'http://tsnk.xvm.mit.edu:5000/',
	powerupsUsed = 0,
	avaliablePowerups = [],
	powerupInfo = {
		// TODO: implement EARLY CASH IN
		'Slower_Better' : {'cost': 1000, 'count' : 0, 'name': 'MOVE SLOWER & MORE MONEY'},
		'Double_Pellets' : {'cost': 2000, 'count' : 0, 'name' : 'DOUBLE PELLETS'},
		'Life+1' : {'cost': 3000, 'count' : 0, 'name' : ' LIFE + 1'},
		'Early_Cash_In' : {'cost': 4000, 'count' : 0, 'name' : 'EARLY CASH IN'},
		'Longer' : {'cost': 3000, 'count' : 0, 'name' : 'BEGIN LONGER'},
		'Quicker'  : {'cost': 4000, 'count' : 0, 'name' : 'MOVE QUICKER'},
		'Double_Time' : {'cost': 4000, 'count' : 0, 'name' :'DOUBLE PLAY TIME'}
	},
	powerupsArr = Object.keys(powerupInfo),
	getRandomPowerUps = function() {
	    var size=3, shuffled = powerupsArr.slice(0), i = powerupsArr.length, min = i - size, temp, index;
	    while (i-- > min) {
	        index = Math.floor((i + 1) * Math.random());
	        temp = shuffled[index];
	        shuffled[index] = shuffled[i];
	        shuffled[i] = temp;
	    }
       	avaliablePowerups = shuffled.slice(min);		    
	},
	show_form = function(){
        var el = document.getElementById('leaderForm');
        el.classList.add('visible');
	},
	hide_form = function(){
        var el = document.getElementById('leaderForm');
        el.classList.remove('visible');
	};
        

TurboSnake.game.state.add('Preload', TurboSnake.Preload);
TurboSnake.game.state.add('Computer_Menu', TurboSnake.Computer_Menu);
TurboSnake.game.state.add('Buy_Menu', TurboSnake.Buy_Menu);
TurboSnake.game.state.add('Finance_Menu', TurboSnake.Finance_Menu);
TurboSnake.game.state.add('Leader_Menu', TurboSnake.Leader_Menu);
TurboSnake.game.state.add('Home', TurboSnake.Home);
TurboSnake.game.state.add('Menu', TurboSnake.Menu);
TurboSnake.game.state.add('Game', TurboSnake.Game);
TurboSnake.game.state.add('Game_Over', TurboSnake.Game_Over);


getRandomPowerUps();
TurboSnake.game.state.start('Preload');