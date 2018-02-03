const db = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	try {
        let arg = args[0];
        // Load DB
        if (!client.db.hasOwnProperty(arg)) {
            client.db[arg] = await db(new FileAsync(`./data/${ arg }.json`));
        }
        let clean = JSON.stringify(client.db[arg].value(),null,2);
		message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
	} catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['g'],
	permLevel: "Bot Owner"
};

exports.help = {
	name: "getData",
	category: "System"
}
