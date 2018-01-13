const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const Discord = require("discord.js");
exports.subcommands = ["ls","list"];
exports.run = async (client, message, args, level) => {
    // Parameters
    let worldList = "";
    if (!client.db.hasOwnProperty("worlds_" + message.guild.id)) {
        client.db["worlds_" + message.guild.id] = 
            new Enmap({provider: new EnmapLevel({name: "worlds_" + message.guild.id})});
        await client.db["worlds_" + message.guild.id].defer;
    }
    // Process
    await client.db["worlds_" + message.guild.id].forEach((value, key) => {
        worldList += `>> **${ key }** by ${ value }\n`;
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
