exports.subcommands = ["l","ls","list"];
exports.run = async (client, message, args, level, worldname) => {
    // Parameters
	let guildId = message.guild.id,
        raceList = [], races = "";
    // Process
    // Get builtin
    await client.gamedata.races.get("all").value().array.forEach((element, index) => {
        raceList.push(element.race);
    });
    // Get custom
    // Remove disabled
    // Build raceList
    if (raceList.length === 0) {
        races = "Apparently, this world has no sentient races, kupo!";
    } else {
        raceList.forEach((element, index) => {
            races += "• " + element;
        });
    }
    // Respond
    message.channel.send(
`= ${ worldname } = World Races =

${ races }`
        ,{code: "asciidoc"});
}
