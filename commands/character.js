const db = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	// Parameters
    let authorId = message.author.id;
	// Load DB
	if (!client.db.hasOwnProperty(authorId)) {
		client.db[authorId] = await db(new FileAsync(`./data/${ authorId }.json`));
		await client.db[authorId].defaults({"characters":[]}).write();
	}
	// Process
	if (args.length === 0) {
		require("./character/list").run(client, message, args, level);
	} else if (require("./character/list").subcommands.includes(args[0].toLowerCase())) {
		require("./character/list").run(client, message, args, level);
	} else if (require("./character/new").subcommands.includes(args[0].toLowerCase())) {
		require("./character/new").run(client, message, args, level);
	} else if (require("./character/destroy").subcommands.includes(args[0].toLowerCase())) {
		require("./character/destroy").run(client, message, args, level);
	} else {
		let charactername = "";
		await client.db[authorId].get("characters").value().forEach((element,index) => {
			if (element.name === args[0]) {
				charactername = args[0];
			}
		});
		args.shift(); // Remove charactername from args
		if ((charactername === "") || (args.length === 0))  {
			message.channel.send(
				"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
				"Unknown command! Sorry, but I didn't understand that...");
        } else if (require("./character/build").subcommands.includes(args[0].toLowerCase())) {
            require("./character/build").run(client, message, args, level, charactername);
        } else if (require("./character/show").subcommands.includes(args[0].toLowerCase())) {
            require("./character/show").run(client, message, args, level, charactername);
		} else {
			message.channel.send(
				"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
				"Unknown command! Sorry, but I didn't understand that...");
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["c"],
	permLevel: "player"
};

exports.help = {
  name: "character",
  category: "Character"
}
