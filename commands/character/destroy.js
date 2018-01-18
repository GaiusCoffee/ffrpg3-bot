exports.subcommands = ["d","destroy"];
exports.run = async (client, message, args, level) => {
    // Parameters
    let authorId = message.author.id;
    // Validate
    if (args.length < 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Character Name Required!");
    } else if (!await client.db[authorId].get("characters").find({ name:args[1] }).value()){
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Unable to find Character!");
    } else {
        // Process
        let character = await client.db[authorId].get("characters").find({ name:args[1] }).value();
        let confirm = false;
        do {
            let response = await client.awaitReply(message, `Are you sure you want to destroy ${ character.name }, a Lv ${ character.level } ${ character.class }? Y/N **This CANNOT be undone.**`);
            if (["y","Y","yes","YES"].includes(response)) {
                await client.db[authorId].get("characters").remove({ name:args[1] }).write();
                message.reply(`Kupo! ${ args[1] } successfully destroyed.`);
                confirm = true;
            } else if (["n","N","no","NO"].includes(response)) {
                message.reply("Action cancelled, kukupo..");
                confirm = true;
            } else {
                message.reply("Sorry, I didn't catch that. Let me try again, kupo..");
            }
        } while(!confirm);
    }
}
