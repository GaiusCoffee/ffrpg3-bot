const Discord = require("discord.js");
exports.subcommands = ["n","new"];
exports.run = async (client, message, args, level) => {
    // Parameters
    let authorId = message.author.id;
    // Validate
    if (args.length < 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Character Name Required!");
    } else if (args.length > 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Character Name cannot contain spaces!");
    } else if (await client.db[authorId].get("characters").find({ name:args[1] }).value()) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Character already exists!");
    } else {
        // Process
        let charactername = args[1];
        const msg = await message.channel.send("Please wait; Creating your character, kupo..");
        await client.db[authorId].get("characters").push({

        }).write();
        // Respond
        const embed = new Discord.RichEmbed()
            .setAuthor("Cidolfus \"The Super Moogle\" Artemicion", "http://ffrpg3bot.gaius.online/images/cid.small.gif")
            .setThumbnail("http://ffrpg3bot.gaius.online/images/cid.large.png")
            .setColor(0x7D3C98)
            .setTitle(`The Characters of ${ message.author.username }`)
            .setDescription(`A new character has been created, kupo!\n\n**${ charactername }**, a Lv1 Freelancer!`)
            .setFooter("http://ffrpg3bot.gaius.online 🐙🇵🇭");
        msg.edit({embed});
    }
}
