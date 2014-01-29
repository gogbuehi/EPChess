    function Piece(id) {
        this.mName="Ebert"; //This is just to make the game fun
        this.mId=id;
        this.mType=null;
        this.mPlayer=null;
        this.mSpace=null;
        this.hasMoved = false;
        this.placePiece = function() {
            if (this.mSpace === null) {
                console.log("mSpace undefined for: " + this.report())
            }else if (this.mSpace.jSpace===undefined) {
                this.report();
            } else {
                this.mSpace.jSpace.html(this.mType);
                this.mSpace.jSpace.click(function(event) {
                    var jObject = $(this);
                    var playerId = jObject.attr("player-data");
                    var pieceId = jObject.attr("piece-data");

                    $(".selected_piece").html(playerId+"_"+pieceId);
                    var selectedPlayer = $(".selected_player");
                    var selectedPlayerId = -1;
                    if (selectedPlayer.length > 0) {
                        selectedPlayerId = selectedPlayer.attr("player-data");
                    }
                    console.log("selected player: " + selectedPlayerId);
                    console.log("piece owner: " + playerId);
                    if (selectedPlayerId == playerId) {
                        var player = Players.getPlayer(playerId);
                        var piece = player.getPiece(pieceId);

                        var possibleSpaces = Rules.checkMoves(piece);
                        $(".possible").removeClass("possible");
                        for (var i in possibleSpaces) {
                            possibleSpaces[i].highlight();
                        }
                    } else {
                        console.log("It's not your turn...");
                    }
                })
            }
        }
        this.report=function() {
            console.log("PIECE: " + this.mType + "\n" + (this.mSpace === undefined) ? "NO MSPACE":this.mSpace.report());
        }
    }
    Piece.prototype.place=function(space) {

        if (this.mSpace!==null) {
            this.mSpace.jSpace.attr("piece-data","");
            this.mSpace.jSpace.attr("player-data","");

        }
        this.mSpace = space;
        this.mSpace.jSpace.attr("piece-data",this.mId);
        this.mSpace.jSpace.attr("player-data",this.mPlayer.mId);

    }
    Piece.prototype.moveToSpace=function(space) {
        var possibleSpaces=Rules.checkMoves(this);
        if (possibleSpaces[space.getLabel()]!==undefined) {
    //Give it a try

    }
    }
    Piece.prototype.getQuadrant = function() {
        return this.mSpace.getQuadrant();
    }
    Piece.prototype.TYPES = {
        KING:"KING",
        QUEEN:"QUEEN",
        BISHOP:"BISHOP",
        KNIGHT:"KNIGHT",
        ROOK:"ROOK",
        PAWN:"PAWN"
    };
    Piece.prototype.MOVE_TYPES = {
        UNRESTRICTED_ADVANCE:1,
        UNRESTRICTED_RETREAT:2,
        UNRESTRICTED_CORNER:8,
        UNRESTRICTED_LATERAL:16,
        PAWN_1_ADVANCE:32,
        PAWN_2_ADVANCE:64,
        CORNER_ATTACK:128,
        KNIGHT:256

    };