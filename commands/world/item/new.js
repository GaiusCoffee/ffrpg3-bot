const Discord = require("discord.js");
exports.subcommands = ["n","new"];
exports.run = async (client, message, args, level, worldname) => {
    // Parameters
	let guildId = message.guild.id;
    // Process
    // Respond
    message.channel.send(`Command valid; Custom items aren't implemented yet, kupooo.. Check back later~`,{code: "asciidoc"});
}
