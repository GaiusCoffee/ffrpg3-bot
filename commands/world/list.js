const Discord = require("discord.js");
exports.subcommands = ["l","ls","list"];
exports.run = async (client, message, args, level) => {
    // Parameters
	let guildId = message.guild.id,
        worldList = "";
    // Process
    await client.db[guildId].get("worlds").value().forEach((element,index) => {
        worldList += `>> **${ element.worldname }** by ${ element.worldbuilder }\n`;
    });
    if (worldList === "") {
        worldList = "None yet! Ask a Worldbuilder to make one, kupo!";
    }
    // Respond
    const embed = new Discord.RichEmbed()
        .setAuthor("Cidolfus \"The Super Moogle\" Artemicion", "http://ffrpg3bot.gaius.online/images/cid.small.gif")
        .setThumbnail("http://ffrpg3bot.gaius.online/images/cid.large.png")
        .setColor(0x7D3C98)
        .setTitle(`The Worlds of ${ message.guild.name }`)
        .setDescription(`${ worldList }`)
        .setFooter("http://ffrpg3bot.gaius.online 🐙🇵🇭");
    message.channel.send({embed});
}
