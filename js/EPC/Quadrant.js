/**
 * Remember, the enemy gate is down
 */
function Quadrant(homePlayer,awayPlayer) {
    this.mHomePlayer = homePlayer;
    this.mAwayPlayer = awayPlayer;
    this.mSpaceMatrix = new Array();
    this.mIsFirst;
    this.mMinColumn = Number.NaN;
    this.mMaxColumn = Number.NaN;
    
    this.init=function(isFirst) {
        this.setIsFirst(isFirst);
        //Every Quadrant has 16 spaces, no matter what
        var rowArray;
        var columnStart = this.mMinColumn;
        for (var i = 0; i < 4; i++) {
            rowArray = new Array();
            for (var j = columnStart; j < (columnStart + 4); j++) {
                rowArray[j] = new Space(i,j);
                rowArray[j].mPlayer = this.mHomePlayer;
            }
            this.mSpaceMatrix[i] = rowArray;
        }
    },
    this.getForwardQuadrant = function() {
        return this.mAwayPlayer.getQuadrant(!this.mIsFirst);
    }
    this.getSpace = function(row,column) {
        console.log("Get Space: " +this.mIsFirst+"|"+ row + "," + column);
        //console.log("Min column: " + this.mMinColumn);
        //console.log("Max column: " + this.mMaxColumn);
        if (row < 0) {
            return null;
        }
        //console.log("Row is > 0");
        if (this.mIsFirst && column < this.mMinColumn) {
            return null;
        }
        //console.log("Not first quad || column < minColumn");
        if (!this.mIsFirst && column > this.mMaxColumn) {
            return null;
        }
        //console.log("Not 2nd quad || column < maxClomun");
        if (column < this.mMinColumn || column > this.mMaxColumn) {
            return this.mHomePlayer.getQuadrant(!this.mIsFirst).getSpace(row,column);
        }
        console.log("Column >= minCol && column <= maxColumn");
        if (row > 3) {
            //Get opposing quadrant, with the same column
            var opposingRow = (7-row);
            var opposingCol = (7-column);
            console.log("Getting opposing: " + !this.mIsFirst + "|" + opposingRow + "," + opposingCol)
            return this.getForwardQuadrant().getSpace(opposingRow,opposingCol);
        }
        return this.mSpaceMatrix[row][column];
    }
}

Quadrant.prototype.getId=function() {
    return this.mHomePlayer.mId;
}

Quadrant.prototype.setIsFirst=function(isFirst) {
    this.mIsFirst = isFirst;
    this.mMinColumn = (isFirst ? 0 : 4);
    this.mMaxColumn = (isFirst ? 3 : 7);
}
Quadrant.prototype.combineSpaces = function(spaceObj1,spaceObj2) {
    for (var i in spaceObj2) {
        spaceObj1[i] = spaceObj2[i];
    }
    return spaceObj1;
}
Quadrant.prototype.getRowSpaces = function(row,maxIncCount) {
    return this.getDiaSpaces(row, 0, 0, 1,maxIncCount)
}
Quadrant.prototype.getColSpaces = function(col,maxIncCount) {
    return this.getDiaSpaces(0, col, 1, 0,maxIncCount);
}
/**
 * Diagonal: Plus Row, Plus Col
 */
Quadrant.prototype.getDPPSpaces = function(row,col,maxIncCount) {
    return this.getDiaSpaces(row,col,1,1,maxIncCount);
}
/**
 * Diagonal: Plus Row, Minus Col
 */
Quadrant.prototype.getDPMSpaces = function(row,col,maxIncCount) {
    return this.getDiaSpaces(row,col,1,-1,maxIncCount);
}
/**
 * Diagonal: Minus Row, Plus Col
 */
Quadrant.prototype.getDMPSpaces = function(row,col,maxIncCount) {
    return this.getDiaSpaces(row,col,-1,1,maxIncCount);
}
/**
 * Diagonal: Minus Row, Minus Col
 */
Quadrant.prototype.getDMMSpaces = function(row,col,maxIncCount) {
    return this.getDiaSpaces(row,col,-1,-1,maxIncCount);
}

Quadrant.prototype.getDiaSpaces = function(row,col,rowInc,colInc,maxIncCount) {
    maxIncCount = (maxIncCount === undefined ? 8 : maxIncCount+1);
    var startSpace = this.getSpace(row,col);
    if (startSpace === undefined) {
        console.log("Start Space Undefined for: " + row + "," + col);
    }
    var spaceLabel = startSpace.getLabel();
    var spaceObject = {};
    spaceObject[spaceLabel] = startSpace;
    
    var iSpace;
    var iRow = row;
    var iCol = col;
    var counter = 1; //Just in case this loop gets out of hand
    do {
        iRow += rowInc;
        iCol += colInc;
        iSpace = this.getSpace(iRow,iCol);
        if (iSpace === null) {
            break;
        }
        spaceObject[iSpace.getLabel()] = iSpace;
    } while (++counter < maxIncCount);
    
    return spaceObject;
}
Quadrant.prototype.getBorderSpaces = function(row,col) {
    var spaceObject = {};
    
    this.addSpace(spaceObject, this.getSpace(row, col));
    
    //Top Left
    this.addSpace(spaceObject, this.getSpace(row+1,col-1));
    //Top Middle
    this.addSpace(spaceObject, this.getSpace(row+1,col));
    //Top Right
    this.addSpace(spaceObject, this.getSpace(row+1,col+1));
    //Mid Left
    this.addSpace(spaceObject, this.getSpace(row,col-1));
    //Mid Right
    this.addSpace(spaceObject, this.getSpace(row,col+1));
    //Low Left
    this.addSpace(spaceObject, this.getSpace(row-1,col-1));
    //Low Middle
    this.addSpace(spaceObject, this.getSpace(row-1,col));
    //Low Right
    this.addSpace(spaceObject, this.getSpace(row-1, col+1));
    
    return spaceObject;
}
Quadrant.prototype.getPawnSpaces = function(row,col,isOtherQuadrant,isFirstMove) {
    var spaceObject = {};
    
    this.addSpace(spaceObject,this.getSpace(row,col));
    
    var forwardDirection = isOtherQuadrant ? -1 : 1;
    
    //Top Middle
    this.addSpace(spaceObject, this.getSpace(row+forwardDirection,col));
    if (isFirstMove) {
        this.addSpace(spaceObject, this.getSpace(row+forwardDirection+forwardDirection,col));
    }
    //Attack spaces
    this.addSpace(spaceObject, this.getSpace(row+forwardDirection,col+1));
    this.addSpace(spaceObject, this.getSpace(row+forwardDirection,col-1));
    
    return spaceObject;
}

Quadrant.prototype.addSpace=function(spaceObject,iSpace) {
    if (iSpace !== null) {
        spaceObject[iSpace.getLabel()]=iSpace;
    }
    return spaceObject;
}
