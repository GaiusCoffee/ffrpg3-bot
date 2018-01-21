exports.subcommands = ["unequipitem", "unequipItem"];
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
    // Check if item exists
    let itemName, itemId, slot;
    if (args.length < 2) {
        message.author.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            `Unable to find the slot you entered.`);
        return;
    } else {
        args.shift();
        slot = args[0];
        if (!['weapon','shield','body','head','hands','accessory'].includes(slot.toLowerCase())) {
            message.author.send(
                "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
                `Unable to find the slot you entered. Valid slots are: weapon, shield, head, hands, body or accessory`);
            return;
        }
    }
    // Process
    await client.db[authorId].get("characters").find({name:charactername}).get("equipInventory").find({slot:slot}).assign({slot:"inventory"}).write();
    let items = "Items               | Cost      | Eq. | Abilities\n" + 
                "-------------------------------------------------\n";
    let character = await client.db[authorId].get("characters").find({name:charactername}).value();
    await character.equipInventory.forEach(async element => {
        let item = await client.gamedata.items.get("all").find({name:element.name}).value();
        items += 
            item.name.padEnd(20) + "| " + 
            item.cost.toString().padStart(5) + " gil | " +
            element.slot.substring(0,3) + " | ";
        if (item.abilities) {
            items += item.abilities.join(",");
        }
        items += "\n";
    });
    message.author.send(
`Character Builder: **${charactername}**

Item unequipped from ${slot} slot back to inventory. Current character's inventory:

${items}`
        ,{code: "asciidoc"});
};
