
var EventHandler = {
    EVENT_GAME_LOAD:"gameLoad",
    EVENT_GAME_START:"gameStart",
    EVENT_GAME_PAUSE:"gamePause",
    EVENT_GAME_STOP:"gameStop",
    EVENT_GAME_RESET:"gameReset",
    whosThere:function(label) {
        $(document).trigger(label);
    },
    registerSpace:function(label,action) {
        $(document).unbind(label);
        $(document).bind(label,action);
    },
    unregisterSpace:function(label) {
        $(document).unbind(label);
        $(document).bind(label,function() {
            
        })
    }
}