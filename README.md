TODO:
    [] - ensure we are drawing inside the canvas
    [] - points
    [] - game over
    [] - sounds?
    [] - refactor to prevent dumb developer errors 
    [] - settings screen?
    [] - multiple games with game select? (probbably not)


Change Log:
    V 0.6
    - Added text class
    - Next level screen
    - lose screen
    - win screen
    - ball speed increases each level
    - added colors to the rest of the levels
    V 0.5
    - Improved readability in gameLogicLoop
    - Canvas now clears after loss/win
    - Centered and changed game title
    - Added "Press Start p2" font
    - Added Next level function
    - Added Point Logic
    V 0.4.1
    - Fixed weird hitbox on ball
    - Fixed getBounds() in ball class
    - finished boundsWithinBounds function and implemented
    V 0.4
    - Removed a lot of useless set functions in classes
    - Moved Initilize to the bottom where it should be
    - Added getBounds to Ball Class
    - Worked on bounds within bounds function
    V 0.3
    - Added "Level Up" Game state
    - Added Level Data
    - Renamed player to Paddle (it just makes more sense)
    - Renamed squares to tiles (it just makes more sense)
    - Create tiles function
    - Rainbow Tiles!
    - Added getBounds and GetCenter to Paddle
    - Added add function to vec2
    - Removed redundant fill style in rect
    - Draw Tiles Function
    - Key Controls
    - Initilize game function
    - loseGame function executed when ball goes out of bounds
    - Array remove value function
    - simple clamp function because javascript's math library doesnt have clamp for god knows what reason
    - isWithin function added
    - Ball collision checks
    - GameLogicLoop
    - Ball moves
    - Ball bounces off the walls
    - Ball and paddle are drawn
    V 0.2.1
    - Continued work on game classes
    - realized get functions in classes are useless in this case
    - added speed to player
    - added ball offset direction
    V 0.2
    - Added Game object
    - Started classes player, and ball
    - Added fill option to all shapes
    - renamed all shape classes to be lowercase
    - initlize game function
    V 0.1
    - Added canvas
    - Updated author information
    - Clean black theme, center canvas, canvas border
    - Added classes vec2, Square, Rectangle, and Circle
    - Added draw loop
    - Added this change log