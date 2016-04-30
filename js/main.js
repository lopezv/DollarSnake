var TurboSnake = TurboSnake || {};

TurboSnake.game = new Phaser.Game(16*48, 768, Phaser.AUTO, '');

var credit = 5000,
	debt = 50000,
	powerupsArr = ['Slow_Time', 'Double_Pellets', 'Life+1', 'Early_Cash_In', 'Longer', 'Quicker_Better', 'Double_Time'],
	startX = 96, startY = 96,
	avaliablePowerups = [],
	powerupInfo = {
		'Slow_Time' : {'cost': 1000, 'count' : 0},
		'Double_Pellets' : {'cost': 1000, 'count' : 0},
		'Life+1' : {'cost': 1000, 'count' : 0},
		'Early_Cash_In' : {'cost': 1000, 'count' : 0},
		'Longer' : {'cost': 1000, 'count' : 0},
		'Quicker_Better'  : {'cost': 1000, 'count' : 0},
		'Double_Time' : {'cost': 1000, 'count' : 0}
	};
        

TurboSnake.game.state.add('Preload', TurboSnake.Preload);
TurboSnake.game.state.add('Computer_Menu', TurboSnake.Computer_Menu);
TurboSnake.game.state.add('Buy_Menu', TurboSnake.Buy_Menu);
TurboSnake.game.state.add('Finance_Menu', TurboSnake.Finance_Menu);
TurboSnake.game.state.add('Home', TurboSnake.Home);
TurboSnake.game.state.add('Menu', Menu);
TurboSnake.game.state.add('Game', Game);
TurboSnake.game.state.add('Game_Over', Game_Over);

TurboSnake.game.state.start('Preload');