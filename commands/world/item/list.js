exports.subcommands = ["l","ls","list"];
exports.run = async (client, message, args, level, worldname) => {
    let guildId = message.guild.id,
        items = "",
        itemList = [];
    if (args.length = 2) {
        let itemName = args[1];
        // Get builtin        
        await client.gamedata.items.get("all").find({ name:itemName }).value().forEach((element, index) => {
            itemList.push(element);
        });
        // Get custom
        // Remove disabled
        // Build items
        if (itemList.length == 0) {
            items = `Apparently, there are no items named ${ itemName } in this world, kupo...`;
        } else {
            items = `** ${ itemList[0].name } **\n\n` + 
                `• Type        : ${ itemList[0].type }\n` +  
                `• Slot        : ${ itemList[0].type }\n` +  
                `• Tier        : ${ itemList[0].type }\n` +  
                `• Cost        : ${ itemList[0].type }\n` +
                `• Availability: ${ itemList[0].type }\n`;
            if (itemName[0].weaponSkill) {
                items += `• Weapon Skill: ${ itemList[0].weaponSkill }\n`;
            }
            if (itemName[0].dmgMulti) {
                items += `• Damage Code : (${ itemList[0].dmgMulti } x ${ itemList[0].dmgAttr.toUpperCase() }) + ${ itemList[0].dmgDice }\n`;
            }
            if (itemList[0].armBonus) {
                items += `• ARM Bonus   : +${ itemList[0].armBonus }\n`
            }
            if (itemList[0].marmBonus) {
                items += `• MARM Bonus  : +${ itemList[0].marmBonus }\n`
            }
            if (itemList[0].evaBonus) {
                items += `• EVA Bonus   : +${ itemList[0].evaBonus }\n`
            }
            if (itemList[0].mevaBonus) {
                items += `• MEVA Bonus  : +${ itemList[0].mevaBonus }\n`
            }
            if (itemName[0].effect) {
                items += `• Effect      : ${ itemList[0].effect }\n`
            }
            if (itemName[0].cast) {
                items += `• Casts on Use: ${ itemList[0].cast }\n`
            }
            if (itemName[0].abilities) {
                items += `• Abilities   : ${ itemList[0].abilities.join(",") }\n`
            }
        }
        // Respond
        message.channel.send(
`= ${ worldname } = World Item Details = 

${ items }`
            ,{code: "asciidoc"});    
    } else if (args.length = 3) {
        // Parameters
        let filterType = args[1], 
            filterTier = args[2];
        // Get builtin        
        await client.gamedata.items.get("all").find({ type:filterType, tier:filterTier }).value().forEach((element, index) => {
            itemList.push(element);
        });
        // Get custom
        // Remove disabled
        // Build items
        if (itemList.length == 0) {
            items = "Apparently, there are no items of this type and/or tier in this world, kupo...";
        } else {
            items = "Items              | Cost  | Avail | Abilities\n" + 
                    "----------------------------------------------\n";
            itemList.forEach(element => {
                items += 
                    element.name.padEnd(20) + "| " + 
                    element.cost.padEnd(5) + "| " +
                    element.avail.padEnd(6) + "| " +
                    element.abilities.join(" ") + "\n";
            });
        }
        // Respond
        message.channel.send(
`= ${ worldname } = World Tier ${ filterTier } ${ filterType } = 

${ items }

Use the '/mog *worldname* item list *itemname*' command to view specific details regarding an item.`
            ,{code: "asciidoc"});        
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
            items += "• " + element;
        });
        // Respond
        message.channel.send(
`= ${ worldname } = World Item Types = 

${ items }

Use the '/mog' *worldname* item list *type* *tier*' command to list items of specific type and tier.`
            ,{code: "asciidoc"});
    }
}
