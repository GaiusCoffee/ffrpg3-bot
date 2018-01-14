exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const friendly = client.config.permLevels.find(l => l.level === level).name;
	const msg = await message.channel.send("Ping?");
	msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.\n Also, your permission level is: ${level} - ${friendly}`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["pong","p"],
	permLevel: "User"
};

exports.help = {
	name: "ping",
	category: "System"
}
