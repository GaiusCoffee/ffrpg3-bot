exports.subcommands = ["l","ls","list"];
exports.run = async (client, message, args, level, worldname) => {
    // Parameters
	let guildId = message.guild.id,
        classList = [], classes = "";
    // Process
    // Get builtin
    await client.gamedata.classes.get("all").value().array.forEach((element, index) => {
        classList.push(element.name);
    });
    // Get custom
    // Remove disabled
    // Build raceList
    if (classList.length === 0) {
        classes = "Apparently, this world has no classes available except Freelancer, kupo!";
    } else {
        classList.forEach((element, index) => {
            classes += "• " + element;
        });
    }
    // Respond
    message.channel.send(
`= ${ worldname } = World Classes =

${ races }`
        ,{code: "asciidoc"});
}
