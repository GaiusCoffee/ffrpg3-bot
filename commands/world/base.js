const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const Discord = require("discord.js");
exports.subcommands = ["ls","list"];
exports.run = (client, message, args, level) => {
    let db = new Enmap({provider: new EnmapLevel({name: "worlds_" + message.guild.id})});
    let worldList = "";
    db.forEach((value, key) => {
        worldList += `  >> ${ key }\n`;
    });
    if (worldList === "") {
        worldList = "None yet! Ask a Worldbuilder to make one, kupo!";
    }
    const embed = new Discord.RichEmbed()
        .setAuthor("Cidolfus \"The Super Moogle\" Artemicion", "http://ffrpg3bot.gaius.online/images/cid.small.gif")
        .setThumbnail("http://ffrpg3bot.gaius.online/images/cid.large.png")
        .setColor(0x7D3C98)
        .setTitle(`The Worlds of ${ message.guild.name }`)
        .setDescription(`${ worldList }`)
        .setFooter("http://ffrpg3bot.gaius.online 🐙🇵🇭")
    message.channel.send({embed});
}
