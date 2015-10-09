/*
// Close window on disconnect
(function ($window, $document, bs) {

    var socket = bs.socket;
    socket.on("disconnect", function (client) {
        window.close();
    });

})(window, document, ___browserSync___);
*/

// Reload window on reconnect
(function ($window, $document, bs) {

    var socket = bs.socket;
    var canReload = false;

    socket.on("connection", function (client) {
        if (canReload) {
            canReload = false;
            window.location.reload();
        }
    });
    socket.on("disconnect", function (client) {
        canReload = true;
    });

})(window, document, ___browserSync___);
