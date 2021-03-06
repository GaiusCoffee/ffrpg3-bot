exports.subcommands = ["item"];
exports.run = async (client, message, args, level, worldname) => {
	// Process
	args.shift(); // Remove subcommand from args
	if (args.length === 0) {
		require("./item/list").run(client, message, args, level, worldname);
	} else if (require("./item/list").subcommands.includes(args[0].toLowerCase())) {
		require("./item/list").run(client, message, args, level, worldname);
	} else if (require("./item/enable").subcommands.includes(args[0].toLowerCase())) {
		require("./item/enable").run(client, message, args, level, worldname);
	} else if (require("./item/disable").subcommands.includes(args[0].toLowerCase())) {
		require("./item/disable").run(client, message, args, level, worldname);
	} else {
		message.channel.send(
			"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
			"Unknown command! Sorry, but I didn't understand that...");
	}
}
