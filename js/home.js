var TurboSnake = TurboSnake || {};

TurboSnake.Home = function() {
        this.map = null;
        this.floor = null;
        this.walls = null;
        this.computer = null;
        this.snake = null;

        this.safetile = 1;
        this.gridsize = 16;
        this.blocksize = 30;
        this.key_style = { font: "bold 15px sans-serif", fill: "#46c0f9", align: "center" };
        this.object_style = { font: "bold 15px sans-serif", fill: "#fff", align: "center" };

};

TurboSnake.Home.prototype = {

    init: function () {
        	this.physics.startSystem(Phaser.Physics.ARCADE);
    },
    create: function() {
	        this.game.stage.backgroundColor = '#061f27';
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('TilesSet', 'tiles');
            this.map.addTilesetImage('computer', 'computer')

            this.floor = this.map.createLayer('Tile Layer 1');
            this.walls = this.map.createLayer('Tile Layer 2');
            this.computer = this.map.createLayer('Tile Layer 3');

            this.map.setCollisionByExclusion([0],true,this.walls);
            this.map.setCollisionByExclusion([0],true,this.computer);

            this.createHeader();

            this.snake = this.add.sprite(startX, startY, 'snake_home');
            this.snake.anchor.set(0.5);
		    this.snake.animations.add('left', [4, 5, 6, 7], 10, true);
		    this.snake.animations.add('right', [8, 9, 10, 11], 10, true);
		    this.snake.animations.add('down', [0, 1, 2, 3], 10, true);
    		this.snake.animations.add('up', [12, 13, 14, 15], 10, true);

            this.physics.arcade.enable(this.snake);
            this.snake.body.collideWorldBounds = true;

            this.cursors = this.input.keyboard.createCursorKeys();
            this.cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },
    move: function(){
	    this.snake.body.velocity.x = 0;
	    this.snake.body.velocity.y = 0;

	    if (this.cursors.left.isDown)
	    {
	        this.snake.body.velocity.x = -150;
	        this.snake.animations.play('left');
	    }
	    else if (this.cursors.right.isDown)
	    {
	        this.snake.body.velocity.x = 150;
	        this.snake.animations.play('right');
	    }
	    else if (this.cursors.up.isDown)
	    {
	        this.snake.body.velocity.y = -150;
	        this.snake.animations.play('up');
	    }
	    else if (this.cursors.down.isDown)
	    {
	        this.snake.body.velocity.y = 150;
	        this.snake.animations.play('down');
	    }
	    else
	    {
	        this.snake.animations.stop();
	    }

	    if(this.cursors.space.isDown){

	    	startX = Math.floor(this.snake.x);
	    	startY = Math.floor(this.snake.y);
	    	
	        this.state.start('Computer_Menu');
	    }

    },
    getCoors: function() {
		var x = Phaser.Math.snapToFloor(Math.floor(this.snake.x), this.blocksize)/ this.blocksize,
			y = Phaser.Math.snapToFloor(Math.floor(this.snake.y), this.blocksize)/ this.blocksize;

		return {x:x,y:y}

    },
    update: function () {
          
            this.physics.arcade.collide(this.snake, this.walls);
            if(this.physics.arcade.collide(this.snake, this.computer)){
		        this.state.start('Computer_Menu');
            }

            this.move();

            var coors = this.getCoors();
            if(coors.y == 14 && (coors.x == 10 || coors.x==8 ||coors.x ==9)){
	        	this.state.start('Menu');
            }
	},
	createHeader: function(){
	        var worth = this.add.text(410,20, 'Your net worth : ', this.key_style);
	        this.add.text(420 + worth.width,20, (credit - debt), this.object_style);

	        var day_text = this.add.text(410,50, 'Day : ', this.key_style);
	        this.add.text(420 + day_text.width,50, day +'', this.object_style);

	        var credit_text = this.add.text(10,20, 'Credit : ', this.key_style);
	        this.add.text(20 + credit_text.width,20, credit, this.object_style);

	        var debt_text = this.add.text(10,50, 'Debt : ', this.key_style);
	        this.add.text(20 + debt_text.width,50, debt, this.object_style);
	}

};


