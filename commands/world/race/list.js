exports.subcommands = ["l","ls","list"];
exports.run = async (client, message, args, level, worldname) => {
    // Parameters
	let guildId = message.guild.id,
        raceList = [], races = "";
    // Process
    // Get builtin
    await client.gamedata.races.get("all").sortBy("race").value().forEach((element, index) => {
        raceList.push(element);
    });
    // Get custom
    // Remove disabled
    // Build raceList
    if (raceList.length === 0) {
        races = "Apparently, this world has no sentient races, kupo!";
    } else {
        races = "Race            Max | Str | Vit | Agi | Spd | Mag | Spr\n" +
                "-------------------------------------------------------\n";
        raceList.forEach((element, index) => {
            races += `${ element.race.padEnd(20) }| ${element.attrMax.str.toString().padStart(3)} ` +
            `| ${element.attrMax.vit.toString().padStart(3)} | ${element.attrMax.agi.toString().padStart(3)} `+
            `| ${element.attrMax.spd.toString().padStart(3)} | ${element.attrMax.mag.toString().padStart(3)} `+
            `| ${element.attrMax.spr.toString().padStart(3)}\n`;
        });
    }
    // Respond
    message.channel.send(
`= ${ worldname } = World Races =

${ races }`
        ,{code: "asciidoc"});
}
