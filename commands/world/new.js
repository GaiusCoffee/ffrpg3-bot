const Discord = require("discord.js");
exports.subcommands = ["new"];
exports.run = async (client, message, args, level) => {
    // Parameters
	let guildId = message.guild.id;
    // Validate
    if (args.length < 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Worldname Required!");
    } else if (args.length > 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Worldnames cannot contain spaces!");
    } else if (await client.db[guildId].get("worlds").find({ worldname:args[1] }).value()) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Worldname already exists!");
    } else {
        // Process
        let worldname = args[1];
        await client.db[guildId].get("worlds").push({ 
            "worldname":worldname, 
            "worldbuilder":message.author.username 
        }).write();
        const msg = await message.channel.send("Please wait; Building world, kupo..");
        // Respond
        const embed = new Discord.RichEmbed()
            .setAuthor("Cidolfus \"The Super Moogle\" Artemicion", "http://ffrpg3bot.gaius.online/images/cid.small.gif")
            .setThumbnail("http://ffrpg3bot.gaius.online/images/cid.large.png")
            .setColor(0x7D3C98)
            .setTitle(`The Worlds of ${ message.guild.name }`)
            .setDescription(`A new world has been created in this discord server, kupo!\n\n**${ worldname }**`)
            .setFooter("http://ffrpg3bot.gaius.online 🐙🇵🇭");
        msg.edit({embed});
    }
}
