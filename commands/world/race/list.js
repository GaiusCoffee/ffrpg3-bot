const Discord = require("discord.js");
exports.subcommands = ["l","ls","list"];
exports.run = async (client, message, args, level, worldname) => {
    // Parameters
	let guildId = message.guild.id,
        raceList = "";
    // Process
    // Get builtin

    // Get custom

    // Remove disabled

    // Build raceList
    
    if (raceList === "") {
        raceList = "Apparently, this world has no sentient races, kupo!";
    }
    // Respond
    message.channel.send(
`= ${ worldname } = World Races =

${ raceList }`
        ,{code: "asciidoc"});
}
