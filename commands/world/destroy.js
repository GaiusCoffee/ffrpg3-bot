const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const Discord = require("discord.js");
exports.subcommands = ["destroy"];
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
    } else if (await !client.db["worlds_" + message.guild.id].some(
            (value, key) => { return key.toLowerCase() === args[1].toLowerCase(); })) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Unable to find Worldname!");
    } else {
        // Process
        let worldname;
        await client.db["worlds_" + message.guild.id].forEach((value, key) => {
            if (key.toLowerCase() === args[1].toLowerCase()) {
                worldname = key;
            }
        });
        let worldbuilder = await client.db["worlds_" + message.guild.id].get(worldname);
        let response = await client.awaitReply(message, `Are you sure you want to destroy ${ worldname } by ${ worldbuilder }? Y/N **This CANNOT be undone.**`);
        if (["y","Y","yes","YES"].includes(response)) {
            await client.db["worlds_" + message.guild.id].delete(worldname);
            message.reply(`Kupo! ${ worldname} successfully destroyed.`);
        } else {
            message.reply("Action cancelled, kukupo..");
        }
    }
}
