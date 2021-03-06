exports.subcommands = ["additem", "addItem"];
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
    let itemName;
    if (args.length < 2) {
        message.author.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            `Unable to find the item your entered.`);
        return;
    } else {
        args.shift();
        itemName = args.join(" ");
        if (!await client.gamedata.items.get("all").find({name:itemName}).value()) {
            message.author.send(
                "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
                `Unable to find the item your entered.`);
            return;
        }
    }
    // Process
    await client.db[authorId].get("characters").find({name:charactername}).get("equipInventory").push({
        id:client.chance.guid(),
        name:itemName,
        slot:"inventory"
    }).write();
    let items = "Items               | Cost      | Avail | Abilities\n" + 
                "---------------------------------------------------\n";
    await client.db[authorId].get("characters").find({name:charactername}).value().equipInventory.forEach(async element => {
        let item = await client.gamedata.items.get("all").find({name:element.name}).value();
        items += 
            item.name.padEnd(20) + "| " + 
            item.cost.toString().padStart(5) + " gil | " +
            item.avail.toString().padStart(4) + "% | ";
        if (item.abilities) {
            items += item.abilities.join(",");
        }
        items += "\n";
    });
    message.author.send(
`Character Builder: **${charactername}**

Item '${itemName}' added to inventory. Current character's inventory:

${items}`
        ,{code: "asciidoc"});
};
