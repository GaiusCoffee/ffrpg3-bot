const db = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	// Load DB
	let guildId = message.guild.id;
	if (!client.db.hasOwnProperty(guildId)) {
		client.db[guildId] = await db(new FileAsync(`./data/${ guildId }.json`));
		await client.db[guildId].defaults({
			characters:[],
			config:[],
			disabled:[],
			worlds:[]
		}).write();
	}
	// Process
	if (args.length === 0) {
		require("./world/list").run(client, message, args, level);
	} else if (require("./world/list").subcommands.includes(args[0].toLowerCase())) {
		require("./world/list").run(client, message, args, level);
	} else if (require("./world/new").subcommands.includes(args[0].toLowerCase())) {
		require("./world/new").run(client, message, args, level);
	} else if (require("./world/destroy").subcommands.includes(args[0].toLowerCase())) {
		require("./world/destroy").run(client, message, args, level);
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
