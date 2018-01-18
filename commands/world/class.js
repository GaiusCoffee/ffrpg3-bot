exports.subcommands = ["class"];
exports.run = async (client, message, args, level, worldname) => {
	// Process
	args.shift(); // Remove subcommand from args
	if (args.length === 0) {
		require("./class/list").run(client, message, args, level, worldname);
	} else if (require("./class/list").subcommands.includes(args[0].toLowerCase())) {
		require("./class/list").run(client, message, args, level, worldname);
	} else if (require("./class/enable").subcommands.includes(args[0].toLowerCase())) {
		require("./class/enable").run(client, message, args, level, worldname);
	} else if (require("./class/disable").subcommands.includes(args[0].toLowerCase())) {
		require("./class/disable").run(client, message, args, level, worldname);
	} else {
		message.channel.send(
			"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
			"Unknown command! Sorry, but I didn't understand that...");
	}
}
