const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const Discord = require("discord.js");
exports.subcommands = ["new"];
exports.run = async (client, message, args, level) => {
    // Parameters
    if (!client.db.hasOwnProperty("worlds_" + message.guild.id)) {
        client.db["worlds_" + message.guild.id] = 
            new Enmap({provider: new EnmapLevel({name: "worlds_" + message.guild.id})});
        await client.db["worlds_" + message.guild.id].defer;
    }
    // Validate
    if (args.length < 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Worldname Required!");
    } else if (args.length > 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Worldnames cannot contain spaces!");
    } else if (await client.db["worlds_" + message.guild.id].some(
            (value, key) => { return key.toLowerCase() === args[1].toLowerCase(); })) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Worldname already exists!");
    } else {
        // Process
        let worldname = args[1];
        await client.db["worlds_" + message.guild.id].set(worldname, message.author.username);
        // Respond
        const embed = new Discord.RichEmbed()
            .setAuthor("Cidolfus \"The Super Moogle\" Artemicion", "http://ffrpg3bot.gaius.online/images/cid.small.gif")
            .setThumbnail("http://ffrpg3bot.gaius.online/images/cid.large.png")
            .setColor(0x7D3C98)
            .setTitle(`The Worlds of ${ message.guild.name }`)
            .setDescription(`A new world has been created in this discord server:\n\n**${ worldname }**`)
            .setFooter("http://ffrpg3bot.gaius.online 🐙🇵🇭");
        message.channel.send({embed});
    }
}
