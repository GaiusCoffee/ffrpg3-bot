exports.subcommands = ["c","config"];
exports.run = async (client, message, args, level, charactername) => {
	// Process
	args.shift(); // Remove subcommand from args
	if (args.length === 0) {
		require("./build/list").run(client, message, args, level, worldname);
	} else if (require("./build/list").subcommands.includes(args[0].toLowerCase())) {
		require("./build/list").run(client, message, args, level, worldname);
	} else {
		message.channel.send(
			"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
			"Unknown command! Sorry, but I didn't understand that...");
	}
}
