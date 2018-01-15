const Discord = require("discord.js");
exports.subcommands = ["l","ls","list"];
exports.run = async (client, message, args, level, worldname) => {
    // Parameters
	let guildId = message.guild.id,
        configList = "";
    // Process
    await client.db[guildId].get("worlds").find({ worldname:worldname }).value().config.forEach((element,index) => {
        configList += `• ${ element.key } : ${ element.value }\n`;
    });
    if (configList === "") {
        configList = "Wait.. what? No configuration found? Something went horribly wrong, kupo.. Try again?";
    }
    // Respond
    message.channel.send(
`= ${ worldname } = World Configuration =

${ configList }
use '/mog world ${ worldname } config get <key>' for more info.`
        ,{code: "asciidoc"});
}
