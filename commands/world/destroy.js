exports.subcommands = ["d","destroy"];
exports.run = async (client, message, args, level) => {
    // Parameters
	let guildId = message.guild.id;
    // Validate
    if (args.length < 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Worldname Required!");
    } else if (!await client.db[guildId].get("worlds").find({ worldname:args[1] }).value()){
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Unable to find Worldname!");
    } else {
        // Process
        let worldname = args[1],
            worldbuilder = await client.db[guildId].get("worlds").find({ worldname:args[1] }).value().worldbuilder;
        let response = await client.awaitReply(message, `Are you sure you want to destroy ${ worldname } by ${ worldbuilder }? Y/N **This CANNOT be undone.**`);
        if (["y","Y","yes","YES"].includes(response)) {
            await client.db[guildId].get("worlds").remove({ worldname:worldname }).write();
            message.reply(`Kupo! ${ worldname} successfully destroyed.`);
        } else {
            message.reply("Action cancelled, kukupo..");
        }
    }
}
