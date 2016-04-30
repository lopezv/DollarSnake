var snake, apple, squareSize, score, speed, total_time, time_left, begin_time, timeTextValue,
    updateDelay, direction, new_direction, lives, early_cash_in_button, snake_length, multiplier,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var TurboSnake = TurboSnake || {};

TurboSnake.Game = function() {};


TurboSnake.Game.prototype = {

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        this.game.load.image('snake', '../assets/images/snake.png');
        this.game.load.image('apple', '../assets/images/apple.png');

    },

    create : function() {

        // By setting up global variables in the create function, we initialise them on game start.
        // We need them to be globally available so that the update function can alter them.

        snake = [];                     // This will work as a stack, containing the parts of our snake
        apple = {};                     // An object for the apple;
        squareSize = 15;                // The length of a side of the squares. Our image is 15x15 pixels.
        score = 0;                      // Game score.
        speed = 0;                      // Game speed.
        total_time = 30;                // Total number of seconds in the game
        time_left = total_time;         // Number of seconds left in the game, updates continuously
        begin_time = (new Date()).getTime();    // time at the start of the game
        update_diff = 5;                // # of interations before update. more = slower snake, less = faster snake
        updateDelay = 0;                // A variable for control over update rates.
        direction = 'right';            // The direction of our snake.
        new_direction = null;           // A buffer to store the new direction into.
        addNew = false;                 // A variable used when an apple has been eaten.
        lives = 0;                      // Num lives, can be at most 1.
        early_cash_in_button = false;   // if you can cash in early or not
        snake_length = 10;              // default snake length
        multiplier = 1;                 // multiplier per snake piece

        // Set up a Phaser controller for keyboard input.
        cursors = this.game.input.keyboard.createCursorKeys();

        this.game.stage.backgroundColor = '#061f27';

        // Look at which powerups are in effect, decrement accordingly
        var keys = Object.keys(powerupInfo);
        for (i = 0; i < keys.legnth; i++) {
            if (powerupInfo[keys[i]]['count'] > 0) {
                powerupInfo[keys[i]]['count'] --;
                switch (keys[i]) {
                    case 'Slow_Time':
                        update_diff = 8;            // slows snake, updates slower
                        break;
                    case 'Double_Pellets':
                        this.generateApple();       // makes an extra apple
                        break;
                    case 'Life+1':
                        lives = 1;                  // extra life
                        break;
                    case 'Early_Cash_In':
                        early_cash_in_button = true;   // early cash in button
                        break;
                    case 'Longer':
                        snake_length += 5;          // extra length
                        break;
                    case 'Quicker_Better':
                        multiplier = 1.5;           // each snake pixel worth more
                        update_diff = 3;            // updates faster, speeds up snake
                        break;
                    case 'Double_Time':
                        total_time *= 2;            // doubles time
                        time_left = total_time;     // updates time left
                        break;
                    default:
                        continue;
                }
            }
        }


        // Generate the initial snake stack. Our snake will be 10 elements long.
        for(var i = 0; i < snake_length; i++){
            snake[i] = this.game.add.sprite(150+i*squareSize, 150, 'snake');  // Parameters are (X coordinate, Y coordinate, image)
        }

        // Genereate an apple.
        this.generateApple();

        // Add Text to top of game.
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

        // Score.
        this.game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = this.game.add.text(90, 18, score.toString(), textStyle_Value);
        
        // Speed.
        //game.add.text(500, 20, "SPEED", textStyle_Key);
        //speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value);

        // Time.
        this.game.add.text(455, 20, "TIME LEFT", textStyle_Key);
        timeTextValue = this.game.add.text(540, 18, time_left.toString(), textStyle_Value);

    },

    update: function() {

        // Handle arrow key presses, while not allowing illegal direction changes that will kill the player.

        if (cursors.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }

        // A formula to calculate game speed based on the score.
        // The higher the score, the higher the game speed, with a maximum of 10;
        //speed = Math.min(10, Math.floor(score/5));
        // Update speed value on game screen.
        //speedTextValue.text = '' + speed;

        // Calculate the time left.
        curr_time = (new Date()).getTime();
        time_dif = (curr_time - begin_time)/1000.;
        time_left = total_time - time_dif;
        if (time_left < 0) {
            this.game.state.start('Game_Over');
        }
        timeTextValue.text = '' + Math.ceil(time_left);

        // Since the update function of Phaser has an update rate of around 60 FPS,
        // we need to slow that down make the game playable.

        // Increase a counter on every update call.
        updateDelay++;

        if (updateDelay % update_diff == 0) {


            // Snake movement

            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            // If a new direction has been chosen from the keyboard, make it the direction of the snake now.
            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }


            // Change the last cell's coordinates relative to the head of the snake, according to the direction.

            if(direction == 'right'){
                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if(direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }


            // Place the last cell in the front of the stack.
            // Mark it as the first cell.

            snake.push(lastCell);
            firstCell = lastCell;

            // End of snake movement.



            // Increase length of snake if an apple had been eaten.
            // Create a block in the back of the snake with the old position of the previous last block (it has moved now along with the rest of the snake).
            if(addNew){
                snake.unshift(this.game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

            // Check for apple collision.
            this.appleCollision();

            // Check for collision with self. Parameter is the head of the snake.
            this.selfCollision(firstCell);

            // Check with collision with wall. Parameter is the head of the snake.
            this.wallCollision(firstCell);
        }


    },

    generateApple: function(){

        // Chose a random place on the grid.
        // X is between 0 and 585 (39*15)
        // Y is between 0 and 435 (29*15)

        var randomX = Math.floor(Math.random() * 40 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;

        // Add a new apple.
        apple = this.game.add.sprite(randomX, randomY, 'apple');
    },

    appleCollision: function() {

        // Check if any part of the snake is overlapping the apple.
        // This is needed if the apple spawns inside of the snake.
        for(var i = 0; i < snake.length; i++){
            if(snake[i].x == apple.x && snake[i].y == apple.y){

                // Next time the snake moves, a new block will be added to its length.
                addNew = true;

                // Destroy the old apple.
                apple.destroy();

                // Make a new one.
                this.generateApple();

                // Increase score.
                score++;

                // Refresh scoreboard.
                scoreTextValue.text = score.toString();

            }
        }

    },

    selfCollision: function(head) {

        // Check if the head of the snake overlaps with any part of the snake.
        for(var i = 0; i < snake.length - 1; i++){
            if(head.x == snake[i].x && head.y == snake[i].y){

                // If so, go to game over screen.
                this.game.state.start('Game_Over');
            }
        }

    },

    wallCollision: function(head) {

        // Check if the head of the snake is in the boundaries of the game field.

        if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){


            // If it's not in, we've hit a wall. Go to game over screen.
            this.game.state.start('Game_Over');
        }

    }

};