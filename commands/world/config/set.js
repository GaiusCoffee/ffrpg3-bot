const Discord = require("discord.js");
exports.subcommands = ["s","set"];
exports.run = async (client, message, args, level, worldname) => {
    // Parameters
    if (args.length < 3) {
		message.channel.send(
			"🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
			"Too few parameters for world.config.set command.");
        return;
    }
    let guildId = message.guild.id,
        configKey = args[1],
        configValue = args[2],
        configOldValue = "",
        configElement;
    // Process
    await client.db[guildId].get("worlds").find({ worldname:worldname }).value().config.forEach((element,index) => {
        if (configKey === element.key) {
            configOldValue = element.value;
        }
    });
    // ToDo: Make this work
    await client.db[guildId].get("worlds").find({ worldname:worldname }).find({ key:configKey }).assign({ value:configValue }).write();
    // Respond
    if (configOldValue === "") {
        message.channel.send(
`= ${ worldname } = World Configuration =

Configuration Key/Value pair not found.`
            ,{code: "asciidoc"});
    } else {
        await client.db[guildId].get("worlds").find({ worldname:worldname }).value().config.forEach((element,index) => {
            if (configKey === element.key) {
                configElement = element;
            }
        });
        message.channel.send(
`= ${ worldname } = World Configuration =

Config Key   : ${ configElement.key }
Config Value : ${ configElement.value } (previous: ${ configOldValue })
Value Default: ${ configElement.default }
Description  : ${ configElement.description }`
            ,{code: "asciidoc"});
    }
}
