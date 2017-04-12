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

    ext.teleport = function(x, y, z) {
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
			[" ", "Teleport %s  %m.teleportTypes  x: %n y: %n z: %n", "teleport","playerName", "at"],
			[" ", "Turn %s %m.turnTypes %n %n %n", "turn", "playerName", "horizontal_to", 0],
			[" ", "Build %m.shapes blockType:%n blockData:%n dimensions: %n %n %n", "build", "box", 1, 0, 1, 1, 1],
			[" ", "Place %m.objects :%s :%s :%s :%s", "place",	"wallsign", "", "", "", ""],	
			[" ", "Rainbow radius:%n", "rainbow", 12],	 
			[" ", "Move drone %m.commands %n", "moveDrone", "fwd", 1],
			[" ", "Summon %m.entities", "summon", "Chicken"],
			[" ", "Play entity sound %m.entities %m.entitySounds to player %s", "entitySound", "Chicken", "Ambient", "all"],
			[" ", "Play block sound %m.blocks %m.blockSounds to player %s", "blockSound", "Grass", "Step", "all"],
			[" ", "Play music record %m.records to player %s", "music", "11", "all"],
			[" ", "Chickentype :%s effect:%m.textEffects move:%m.textMovement %m.textMovement %m.textMovement %m.textMovement %m.textMovement %m.textMovement %m.textMovement %m.textMovement", "chickentype", "text", "glow", "steady"],
			[" ", "Set time %s", "time", "0"],
			[" ", "Set weather %m.weather", "weather", "clear"],
			["r", "blockType", "blockType"],
			["r", "blockData", "blockData"],
			["r", "%m.coordinate position of %m.target", "position", "x", "player"],
			["r", "result", "result"]],
        ],
        menus: {
			commands: ["fwd", "back", "left", "right", "up", "down", "turn", "reset", "save_chkpt", "goto_chkpt"],
			entities: ["Cat","Chicken", "Cow", "Horse", "Mushroom_cow", "Pig", "Sheep", "Rabbit", "Wolf", "Creeper", "Skeleton", "Spider",  "Villager", "Zombie"],
			entitySounds: ["Ambient", "Hurt", "Death"],
			blocks: ["Glass", "Grass", "Gravel", "Sand", "Snow", "Stone", "Wood"],
			blockSounds: ["Break","Fall", "Hit", "Place", "Step"],
			records: ["11", "13", "Blocks", "Cat", "Chirp", "Far", "Mall", "Mellohi", "Stal", "Strad", "Wait", "Ward"],
			objects: ["marker","door", "torch", "bed", "ladder", "stairs", "signpost","wallsign"],
			shapes: ["box", "box0", "cylinder", "cylinder0", "prism", "prism0", "sphere", "sphere0", "hemisphere", "hemisphere0"],
			teleportTypes: ["at", "offset", "to_drone"],
			turnTypes: ["horizontal_to", "horizontal_by", "vertical_to", "vertical_by", "to_point", "to_drone"],
			weather: ["clear", "rain", "thunders"],
			textEffects: ["glow", "fire", "blink", "normal"],
			textMovement: ["steady", "rotate", "left", "right", "fwd", "back", "up", "down", "erase_left"],
			coordinate: ["x", "y", "z"],
			target: ["player", "drone"]
        }
    };

    // Register the extension
    ScratchExtensions.register('MCExtension', descriptor, ext);



})({});
