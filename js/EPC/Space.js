function Space(row,column) {
    this.mPlayer=null; //Player whose Home space this is in
    this.mRow = row; //Relative to Home "ceiling"
    this.mColumn = column;
    this.jSpace = null;
    this.mId = Space.prototype.SPACE_ID++;
}
Space.prototype.mPlayer;
Space.prototype.mRow;
Space.prototype.mColumn;
Space.prototype.jSpace;
Space.prototype.mId;
Space.prototype.SPACE_ID=1;
Space.prototype.report = function() {
    console.log("SPACE: [" + this.mRow + "," + this.mColumn + "]");
}
Space.prototype.getLabel=function() {
    return "id"+this.mId+"r"+this.mRow+"c"+this.mColumn;
}
Space.prototype.getQuadrant = function() {
    console.log("Get Quadrant of: " + this.mRow + "," + this.mColumn);
    return this.mPlayer.getQuadrantByColumn(this.mColumn);
}
Space.prototype.highlight = function() {
    this.jSpace.addClass("possible");
}
Space.prototype.whosThere = function() {
    
}