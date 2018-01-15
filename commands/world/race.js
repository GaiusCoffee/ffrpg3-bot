exports.subcommands = ["r","race"];
exports.run = async (client, message, args, level, worldname) => {
	// Process
	args.shift(); // Remove subcommand from args
	if (args.length === 0) {
		require("./race/list").run(client, message, args, level, worldname);
	} else if (require("./race/list").subcommands.includes(args[0].toLowerCase())) {
		require("./race/list").run(client, message, args, level, worldname);
	} else if (require("./race/enable").subcommands.includes(args[0].toLowerCase())) {
		require("./race/enable").run(client, message, args, level, worldname);
	} else if (require("./race/disable").subcommands.includes(args[0].toLowerCase())) {
		require("./race/disable").run(client, message, args, level, worldname);
	} else if (require("./race/new").subcommands.includes(args[0].toLowerCase())) {
		require("./race/new").run(client, message, args, level, worldname);
	} else if (require("./race/change").subcommands.includes(args[0].toLowerCase())) {
		require("./race/change").run(client, message, args, level, worldname);
	} else if (require("./race/destroy").subcommands.includes(args[0].toLowerCase())) {
		require("./race/destroy").run(client, message, args, level, worldname);
	} else {
		message.channel.send(
			"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
			"Unknown command! Sorry, but I didn't understand that...");
	}
}
