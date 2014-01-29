var Rules = {
    OPEN_SPACE:1,
    ATTACK_SPACE:2,
    RESTRICTED_SPACE:3,
    BOUNDARY_SPACE:4,
    
    
    
    /**
     * Moves stopped by:
     *  - ATTACK SPACE
     *  - RESTRICTED SPACE
     */
    checkMoves:function(piece) {
        var quadrant = piece.getQuadrant();
        var possibleSpaces = {};
        
        
        var row = piece.mSpace.mRow;
        var col = piece.mSpace.mColumn;
        var isOtherQuadrant;
        switch (piece.mType) {
            case Piece.prototype.TYPES.PAWN:
                isOtherQuadrant = (quadrant.mHomePlayer.mId!=piece.mPlayer.mId);
                //Check Forward 1 (maybe 2)
                
                quadrant.combineSpaces(possibleSpaces, quadrant.getPawnSpaces(row, col, isOtherQuadrant, !piece.hasMoved));
                //Check Attack Corners
                
                //Check For Final Row
                
                break;
            case Piece.prototype.TYPES.KING:
                //Check directly surrounding squares, one space only
                
                //Get Row, Column from the pieces space
                quadrant.combineSpaces(possibleSpaces, quadrant.getBorderSpaces(row,col));
                
                //Check for Castling
                
                break;
            case Piece.prototype.TYPES.QUEEN:
                //Check all directions, all ranges
                quadrant.combineSpaces(possibleSpaces, quadrant.getColSpaces(col));
                quadrant.combineSpaces(possibleSpaces, quadrant.getRowSpaces(row));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDPPSpaces(row, col));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDPMSpaces(row, col));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDMPSpaces(row, col));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDMMSpaces(row, col));
                break;
            case Piece.prototype.TYPES.BISHOP:
                //Check corners, all ranges
                quadrant.combineSpaces(possibleSpaces, quadrant.getDPPSpaces(row, col));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDPMSpaces(row, col));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDMPSpaces(row, col));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDMMSpaces(row, col));
                
                break;
            case Piece.prototype.TYPES.KNIGHT:
                //Check all 8 possible moves
                quadrant.combineSpaces(possibleSpaces, quadrant.getDiaSpaces(row, col, 1, 2, 1));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDiaSpaces(row, col, 2, 1, 1));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDiaSpaces(row, col, -1, 2, 1));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDiaSpaces(row, col, -2, 1, 1));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDiaSpaces(row, col, 1, -2, 1));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDiaSpaces(row, col, 2, -1, 1));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDiaSpaces(row, col, -1, -2, 1));
                quadrant.combineSpaces(possibleSpaces, quadrant.getDiaSpaces(row, col, -2, -1, 1));
                
                
                
                break;
            case Piece.prototype.TYPES.ROOK:
                //Check Rows, all ranges
                quadrant.combineSpaces(possibleSpaces, quadrant.getColSpaces(col));
                quadrant.combineSpaces(possibleSpaces, quadrant.getRowSpaces(row));
        //Check Columns, all ranges
                
        //Check Castling
        }
        return possibleSpaces;
    },
    rows:function(piece,quadrant) {
        switch (piece.mType) {
            case Piece.prototype.TYPES.PAWN:
        }
    },
    columns:function(space) {
        
    },
    corners:function(space) {
        
    },
    knights:function(space) {
        
    },
    bishop:function() {
        
    }
}