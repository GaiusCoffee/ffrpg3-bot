exports.subcommands = ["setrace", "setRace"];
exports.run = async (client, message, args, level, charactername) => {
    // Parameters
    let authorId = message.author.id;
    // Check if character exists
    if (await !client.db[authorId].get("characters").find({ name:charactername }).value()) {
        message.author.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            `Unable to to find ${ charactername }! Are you sure he exists, kupo? Check with the '/mog character list' command~`);
        return;
    }
    // Check if character status is invalid
    if (await client.db[authorId].get("characters").find({ name:charactername }).value().status != "Invalid") {
        message.author.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            `Unfortunately, ${charactername} seems to have entered a world already, or at least ready to enter one right now. You can no longer change him/her, kupo...`);
        return;
    }
    // Check if race exists
    if (args.length < 2) {
        message.author.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            `Unable to find the race your entered.`);
        return;
    } else {
        let raceFound = false;
        // Check Builtin
        if (await client.gamedata.races.get("all").find({race:args[1]}).value()) {
            raceFound = true;
        }
        // Check Custom on guildId
        if (message.guild) {

        }
        // Send Error
        if (!raceFound) {
            message.author.send(
                "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
                `Unable to find the race your entered. If '${args[1]}' is a custom race in a specific world, please use this command while in the world's Discord Server.`);
            return;
        }
    }
    // Process
    let oldRace = await client.db[authorId].get("characters").find({ name:charactername }).value().race,
        newRace = args[1];
    await client.db[authorId].get("characters").find({ name:charactername }).assign({ "race":newRace }).write();
    message.author.send(
`Character Builder: **${charactername}**

Race has been changed to ${ await client.db[authorId].get("characters").find({ name:charactername }).value().race } (Previously: ${ oldRace }).`
        ,{code: "asciidoc"});
};
