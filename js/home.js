var TurboSnake = TurboSnake || {};

TurboSnake.Home = function() {
        this.map = null;
        this.floor = null;
        this.walls = null;
        this.computer = null;
        this.snake = null;

        this.safetile = 1;
        this.gridsize = 16;
        this.blocksize = 48;
};

TurboSnake.Home.prototype = {

    init: function () {
        	this.physics.startSystem(Phaser.Physics.ARCADE);
    },
    create: function() {
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('TilesSet', 'tiles');
            this.map.addTilesetImage('computer', 'computer')

            this.floor = this.map.createLayer('Tile Layer 1');
            this.walls = this.map.createLayer('Tile Layer 2');
            this.computer = this.map.createLayer('Tile Layer 3');


            this.map.setCollisionByExclusion([0],true,this.walls);
            this.map.setCollisionByExclusion([0],true,this.computer);


            this.snake = this.add.sprite(startX, startY, 'snake');
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
            this.physics.arcade.collide(this.snake, this.computer);

            this.move();

            var coors = this.getCoors();
            if(coors.y == 14 && (coors.x == 7 || coors.x==8 ||coors.x ==9)){
	        	this.state.start('Menu');
            }
	},

};


