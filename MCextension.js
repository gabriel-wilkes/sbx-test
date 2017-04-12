(function (ext) {
	
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };


    ext.connect = function(str) {
        var cmdUrl = "http://localhost:8088/connect/" + encodeURIComponent(str);
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("connect success");
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error connect: ", error);
            }
        }); // nb: GET is including the javascript callback. Do I need this for one-way call?
    };

    ext.teleport = function(str, teleportTypes, x, y, z) {
        var cmdUrl = "http://localhost:8088/teleport/" + encodeURIComponent(str)+ "/" teleportTypes + "/" x + "/" + y + "/" + z;
        $.ajax({
            type: "GET",
            url: cmdUrl,
            //dataType: "jsonp", // hack for the not origin problem - replace with CORS based solution
            success: function(data) {
                console.log("teleport success");
            },
            error: function(jqxhr, textStatus, error) { // have to change this coz jasonp parse error
                console.log("Error setPlayerPos: ", error);
            }
        }); // nb: GET is including the javascript callback. Do I need this for one-way call?
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
			[" ", "Connect User %s", "connect","playerName"],
			[" ", "Teleport %s  %m.teleportTypes  x: %n y: %n z: %n", "teleport","playerName", "at", 0, 0 ,0],
        ],
        menus: {
		teleportTypes: ["at", "offset", "to_drone"]
        }
    };

    // Register the extension
    ScratchExtensions.register('MCExtension', descriptor, ext);



})({});
