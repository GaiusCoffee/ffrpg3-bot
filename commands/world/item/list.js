exports.subcommands = ["l","ls","list"];
exports.run = async (client, message, args, level, worldname) => {
    let guildId = message.guild.id,
        items = "",
        itemList = [];
    if (args.length >= 2) {
        if (!Number.isInteger(Number(args[1]))) {
            args.shift();
            let itemName = args.join(" ");
            // Get builtin
            itemList = await client.gamedata.items.get("all").find({ name:itemName }).value();
            // Get custom
            // Remove disabled
            // Build items
            if (!itemList) {
                items = `Apparently, there are no items named ${ itemName } in this world, kupo...`;
            } else {
                items = 
`**${ itemList.name }**

• Type        : ${ itemList.type }
• Slot        : ${ itemList.slot }
• Tier        : ${ itemList.tier }
• Cost        : ${ itemList.cost } gil
• Availability: ${ itemList.avail }%\n`;
                if (itemList.weaponSkill) {
                    items += `• Weapon Skill: ${ itemList.weaponSkill }\n`;
                }
                if (itemList.dmgMulti) {
                    items += `• Damage Code : (${ itemList.dmgMulti } x ${ itemList.dmgAttr.toUpperCase() }) + ${ itemList.dmgDice }\n`;
                }
                if (itemList.armBonus) {
                    items += `• ARM Bonus   : +${ itemList.armBonus }\n`
                }
                if (itemList.marmBonus) {
                    items += `• MARM Bonus  : +${ itemList.marmBonus }\n`
                }
                if (itemList.evaBonus) {
                    items += `• EVA Bonus   : +${ itemList.evaBonus }\n`
                }
                if (itemList.mevaBonus) {
                    items += `• MEVA Bonus  : +${ itemList.mevaBonus }\n`
                }
                if (itemList.effect) {
                    items += `• Effect      : ${ itemList.effect }\n`
                }
                if (itemList.cast) {
                    items += `• Casts on Use: ${ itemList.cast }\n`
                }
                if (itemList.abilities) {
                    items += `• Abilities   : ${ itemList.abilities.join(",") }\n`
                }
            }
            // Respond
            message.channel.send(
`= ${ worldname } = World Item Details = 

${ items }`
                ,{code: "asciidoc"});
        } else {
            // Parameters
            let filterTier = Number(args[1]);
            args.shift();args.shift();
            let filterType = args.join(" ");
            // Get builtin
            await client.gamedata.items.get("all").filter({ type:filterType, tier:filterTier }).sortBy("avail").value().forEach((element, index) => {
                itemList.push(element);
            });
            // Get custom
            // Remove disabled
            // Build items
            if (itemList.length == 0) {
                items = "Apparently, there are no items of this tier and/or type in this world, kupo...";
            } else {
                items = "Items               | Cost      | Avail | Abilities\n" + 
                        "--------------------------------------------------\n";
                itemList.forEach(element => {
                    items += 
                        element.name.padEnd(20) + "| " + 
                        element.cost.toString().padStart(5) + " gil | " +
                        element.avail.toString().padStart(4) + "% | ";
                    if (element.abilities) {
                        items += element.abilities.join(",");
                    } 
                    items += "\n";
                });
            }
            // Respond
            message.channel.send(
`= ${ worldname } = World Tier ${ filterTier } ${ filterType } = 

${ items }
Use the '/mog world *worldname* item list *itemname*' command to view specific details regarding an item.`
                ,{code: "asciidoc"});
        }
    } else {
        // Get builtin
        await client.gamedata.items.get("all").map("type").value().forEach((element, index) => {
            if (!itemList.includes(element)) {
                itemList.push(element);
            }
        });
        // Get custom
        // Remove disabled
        // Build items
        itemList.forEach(element => {
            items += `• ${element}\n`;
        });
        // Respond
        message.channel.send(
`= ${ worldname } = World Item Types = 

${ items }
Use the '/mog world *worldname* item list *tier* *type*' command to list items of specific tier and type.`
            ,{code: "asciidoc"});
    }
}
