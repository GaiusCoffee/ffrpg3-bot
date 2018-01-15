exports.subcommands = ["c","config"];
exports.run = async (client, message, args, level, worldname) => {
	// Process
	args.shift(); // Remove subcommand from args
	if (args.length === 0) {
		require("./config/list").run(client, message, args, level, worldname);
	} else if (require("./config/list").subcommands.includes(args[0].toLowerCase())) {
		require("./config/list").run(client, message, args, level, worldname);
	} else if (require("./config/get").subcommands.includes(args[0].toLowerCase())) {
		require("./config/get").run(client, message, args, level, worldname);
	} else if (require("./config/set").subcommands.includes(args[0].toLowerCase())) {
		require("./config/set").run(client, message, args, level, worldname);
	} else {
		message.channel.send(
			"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
			"Unknown command! Sorry, but I didn't understand that...");
	}
}
