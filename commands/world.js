exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars	
	// Arg zero check
	if (args.length === 0) {
		require("./world/base").run(client, message, args, level);
	} else if (require("./world/base").subcommands.includes(args[0].toLowerCase())) {
		require("./world/base").run(client, message, args, level);
	} else if (require("./world/new").subcommands.includes(args[0].toLowerCase())) {
		require("./world/new").run(client, message, args, level);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["w"],
	permLevel: "Worldbuilder"
};

exports.help = {
  name: "world",
  category: "World"
}
