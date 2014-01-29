var UX = {
    jQuadrant:null,
    jPlayersList:null,
    jPlayerTag:null,
    init:function() {
        this.jQuadrant = $("table.quadrant_template");
        this.jPlayersList = $("ul.players_list");
        this.jPlayerTag = $("li.players_template");
    },
    buildQuadrants:function() {
        for (var i in Players.mPlayers){
            this.showPlayer(Players.mPlayers[i]);
            this.buildQuadrant(Players.mPlayers[i]);
            //UX.buildQuadrant(Players.mPlayers[i].mQuadrants[0]);
            //UX.buildQuadrant(Players.mPlayers[i].mQuadrants[1]);
        }
        Players.placePieces();
    },
    buildQuadrant:function(player) {
        var quadrant;
        var matrix;
        var jQuadrantClone;
        for (var k in player.mQuadrants) {
            quadrant = player.mQuadrants[k];
            matrix = quadrant.mSpaceMatrix;
            jQuadrantClone = this.jQuadrant.clone().removeClass("template").removeClass("quadrant_template").addClass(quadrant.mHomePlayer.mName);
            jQuadrantClone.css("display","inline-block");
        
            var jRow;
            var jSpace;
            var spaceId;
            for (var i in matrix) {
                jRow = $(jQuadrantClone.find("tr.row"+(i%4)));
                for (var j in matrix[i]) {
                    jSpace = $(jRow.find("td.col"+(j%4)));
                    jSpace.html(i+","+j);
                    spaceId = "v"+quadrant.mHomePlayer.mId+"v"+(i%4)+"v"+(j);
                    jSpace.attr("id",spaceId);
                    matrix[i][j].jSpace = jSpace;
                }
            }
            $("body").append(jQuadrantClone);
            if (!quadrant.mIsFirst) {
                $("body").append("<br />");
            }
        }
    },
    showPlayer:function(player) {
        var jPlayerTagClone = this.jPlayerTag.clone().removeClass("template").removeClass("players_template");
        jPlayerTagClone.html(player.mName);
        jPlayerTagClone.attr("player-data",player.mId);
        jPlayerTagClone.click(function() {
            $("li.selected_player").removeClass("selected_player");
            $(this).addClass("selected_player")
        });
        this.jPlayersList.append(jPlayerTagClone);
    }
}