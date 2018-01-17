const Discord = require("discord.js");
exports.subcommands = ["l","ls","list"];
exports.run = async (client, message, args, level) => {
    // Parameters
    let authorId = message.author.id;
        characterList = "";
    // Process
    await client.db[authorId].get("characters").value().forEach((element,index) => {
        characterList += `>> **${ element.name }**, a Lv ${ element.level } ${ element.class } [${ element.status }]\n`;
    });
    if (characterList === "") {
        characterList = "None yet! Create one using '/mog character new <charactername>', kupo!";
    }
    // Respond
    const embed = new Discord.RichEmbed()
        .setAuthor("Cidolfus \"The Super Moogle\" Artemicion", "http://ffrpg3bot.gaius.online/images/cid.small.gif")
        .setThumbnail("http://ffrpg3bot.gaius.online/images/cid.large.png")
        .setColor(0x7D3C98)
        .setTitle(`The Characters of ${ message.author.username }`)
        .setDescription(`${ characterList }`)
        .setFooter("http://ffrpg3bot.gaius.online 🐙🇵🇭");
    message.channel.send({embed});
}
