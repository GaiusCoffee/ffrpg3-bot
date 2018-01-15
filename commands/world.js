const db = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	// Parameters
	let guildId = message.guild.id;
	// Load DB
	if (!client.db.hasOwnProperty(guildId)) {
		client.db[guildId] = await db(new FileAsync(`./data/${ guildId }.json`));
		await client.db[guildId].defaults({
			characters:[],
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
	} else {
		let worldname = "";
		await client.db[guildId].get("worlds").value().forEach((element,index) => {
			if (element.worldname === args[0]) {
				worldname = args[0];
			}
		});
		args.shift(); // Remove worldname from args
		if ((worldname === "") || (args.length === 0))  {
			message.channel.send(
				"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
				"Unknown command! Sorry, but I didn't understand that...");
			} else if (require("./world/config").subcommands.includes(args[0].toLowerCase())) {
				require("./world/config").run(client, message, args, level, worldname);
			} else if (require("./world/race").subcommands.includes(args[0].toLowerCase())) {
				require("./world/race").run(client, message, args, level, worldname);
		} else {
			message.channel.send(
				"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
				"Unknown command! Sorry, but I didn't understand that...");
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["w"],
	permLevel: "Worldbuilder"
};

exports.help = {
  name: "world",
  category: "World"
}
