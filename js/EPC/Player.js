function Player(id) {
    this.mName = "";
    this.mId=id;
    this.mQuadrants = new Array();
    this.mOpponents = null;
    this.mPieces = new Array();
    this.init = function(opponents) {
        this.mOpponents = opponents;
        this.mQuadrants[0] = new Quadrant(this,this.mOpponents[0]);
        this.mQuadrants[1] = new Quadrant(this,this.mOpponents[1]);
        
        this.mQuadrants[0].init(true);
        this.mQuadrants[1].init(false);
    }
    this.getQuadrant = function(isFirst) {
        return this.mQuadrants[isFirst ? 0 : 1];
    }
    this.getQuadrantByColumn = function(column) {
        return this.getQuadrant(column<4);
    }
    
    this.setPieces=function() {
        //Give the player pieces
        
        //PAWNS
        var pieceCount = 0;
        var i;
        var thePiece;
        for (i = 0; i < 8; i++) {
            this.mPieces[pieceCount] = new Piece(pieceCount);
            this.mPieces[pieceCount].mType = Piece.prototype.TYPES.PAWN;
            this.mPieces[pieceCount].mPlayer = this;
            thePiece = this.mQuadrants[(i<4)?0:1].getSpace(1,i);
            
            this.mPieces[pieceCount].place(thePiece);
            pieceCount++;
        }
        //ROOKS
        for (i = 0; i < 2; i++) {
            this.mPieces[pieceCount] = new Piece(pieceCount);
            this.mPieces[pieceCount].mType = Piece.prototype.TYPES.ROOK;
            this.mPieces[pieceCount].mPlayer = this;
            this.mPieces[pieceCount].place(this.mQuadrants[(i==0)?0:1].getSpace(0,(i==0)?0:7));
            pieceCount++;
        }
        //KNIGHTS
        for (i = 0; i < 2; i++) {
            this.mPieces[pieceCount] = new Piece(pieceCount);
            this.mPieces[pieceCount].mType = Piece.prototype.TYPES.KNIGHT;
            this.mPieces[pieceCount].mPlayer = this;
            this.mPieces[pieceCount].place(this.mQuadrants[(i==0)?0:1].getSpace(0,(i==0)?1:6));
            pieceCount++;
        }
        //BISHOPS
        for (i = 0; i < 2; i++) {
            this.mPieces[pieceCount] = new Piece(pieceCount);
            this.mPieces[pieceCount].mType = Piece.prototype.TYPES.BISHOP;
            this.mPieces[pieceCount].mPlayer = this;
            this.mPieces[pieceCount].place(this.mQuadrants[(i==0)?0:1].getSpace(0,(i==0)?2:5));
            pieceCount++;
        }
        //QUEEN
        this.mPieces[pieceCount] = new Piece(pieceCount);
        this.mPieces[pieceCount].mType = Piece.prototype.TYPES.QUEEN;
        this.mPieces[pieceCount].mPlayer = this;
        this.mPieces[pieceCount].place(this.mQuadrants[0].getSpace(0,3));
        pieceCount++;
        
        //KING
        this.mPieces[pieceCount] = new Piece(pieceCount);
        this.mPieces[pieceCount].mType = Piece.prototype.TYPES.KING;
        this.mPieces[pieceCount].mPlayer = this;
        this.mPieces[pieceCount].place(this.mQuadrants[1].getSpace(0,4));
    },
    this.placePieces = function() {
        for (var i in this.mPieces) {
            this.mPieces[i].placePiece();
        }
    }
}
Player.prototype.getPiece=function(id) {
    return this.mPieces[id];
}
