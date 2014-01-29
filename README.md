This is a little project I started prototyping after playing Tri-Chess with some friend. The only time I spent developing this was during the 20-minute train ride I took between San Jose and Palo Alto in late 2011/early 2012.

As of the initial commit, the game is in the follow state:
 - Some form of "model" exists for the core game components
  - Player
  - Quadrant (a quarter of a normal chess board)
  - Space (I believe this was created to help with managing the board's UI)
  - Piece (any of the various chess pieces)
  - Rules (manager of the rules of chess)
  - UX (manager of visual aspects of the game)
  - EventHandler (one of my early attempts to create an event-driven application; clearly I didn't get far here)

The HTML file is where I sandboxed my attempts to create a visual board. It is set up to represent a tri-chess board (if you don't know what that is, you should look it up; it's more fun that regular chess).

Feel free to comment, question, criticise, or build off what I have here. It's not exactly open-source material, but I figure sharing might get me to clean it up and get it moving along again.
