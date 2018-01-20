exports.subcommands = ["b","build"];
exports.run = async (client, message, args, level, charactername) => {
	// Process
	args.shift(); // Remove subcommand from args
	if (args.length === 0) {
		require("./build/list").run(client, message, args, level, charactername);
	} else if (require("./build/list").subcommands.includes(args[0].toLowerCase())) {
		require("./build/list").run(client, message, args, level, charactername);
	} else if (require("./build/setRace").subcommands.includes(args[0].toLowerCase())) {
		require("./build/setRace").run(client, message, args, level, charactername);
	} else if (require("./build/setClass").subcommands.includes(args[0].toLowerCase())) {
		require("./build/setClass").run(client, message, args, level, charactername);
	} else if (require("./build/setAttributes").subcommands.includes(args[0].toLowerCase())) {
		require("./build/setAttributes").run(client, message, args, level, charactername);
	} else if (require("./build/addItem").subcommands.includes(args[0].toLowerCase())) {
		require("./build/addItem").run(client, message, args, level, charactername);
	} else if (require("./build/removeItem").subcommands.includes(args[0].toLowerCase())) {
		require("./build/removeItem").run(client, message, args, level, charactername);
	} else {
		message.channel.send(
			"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
			"Unknown command! Sorry, but I didn't understand that...");
	}
}
