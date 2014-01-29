/**
 * Every player has 2 quadrants
 */
var Players = {
    mPlayers:new Array(),
    init:function(numberOfPlayers) {
        var i;
        for (i = 0; i < numberOfPlayers; i++) {
            this.mPlayers[i] = new Player(i);
        }
        //Needs to happen after all players are created
        for (i = 0; i < numberOfPlayers; i++) {
            this.mPlayers[i].init([
                this.mPlayers[(i+numberOfPlayers+1)%numberOfPlayers],
                this.mPlayers[(i+numberOfPlayers+2)%numberOfPlayers]
                ]);
            this.mPlayers[i].mName = "player_" + i;
            
        }
        //Needs to happen after all quadrants are made
        for (i = 0; i < numberOfPlayers; i++) {
            
        }
    },
    placePieces:function() {
        for (var i = 0; i < this.mPlayers.length; i++) {
            this.mPlayers[i].setPieces();
            this.mPlayers[i].placePieces();
        }
    },
    getPlayer:function(id) {
    return this.mPlayers[id];
    }
}
var Game = {
    mPieces:{},
    placePiece:function(piece,space) {
        var currentSpace = piece.mSpace;
        this.mPieces[currentSpace.getLabel()] = undefined;
    }
}

$(document).ready(function() {
    Players.init(3);
    UX.init();
    UX.buildQuadrants();
});