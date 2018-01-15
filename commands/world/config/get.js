const Discord = require("discord.js");
exports.subcommands = ["g","get"];
exports.run = async (client, message, args, level, worldname) => {
    // Parameters
    let guildId = message.guild.id,
        configKey = args[1],
        configElement;
    // Process
    await client.db[guildId].get("worlds").find({ worldname:worldname }).value().config.forEach((element,index) => {
        if (configKey === element.key) {
            configElement = element;
        }
    });
    if (!configValue) {
        message.channel.send(
`= ${ worldname } = World Configuration =

Configuration Key/Value pair not found.`
            ,{code: "asciidoc"});
    } else {
        message.channel.send(
`= ${ worldname } = World Configuration =

Config Key   : ${ configElement.key }
Config Value : ${ configElement.value }
Value Default: ${ configElement.default }
Description  : ${ configElement.description }`
            ,{code: "asciidoc"});
    }
    // Respond
    message.channel.send(``,{code: "asciidoc"});
}
