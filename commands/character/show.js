const Discord = require("discord.js");
exports.subcommands = ["s","show"];
exports.run = async (client, message, args, level, charactername) => {
    // Parameters
    let c = await client.db[message.author.id].get("characters").find({name:charactername}).value(),
        cSheet = "";
    // Process
    c = await client.ffrpg3.character.computeSheet(c);
    let subclass = "",
        weaponAccuracy = "",
        skills = "",
        abilities = "",
        items = "\n";
    if (c.subLevel > 0) {
        subclass = `
Level:${c.subLevel.toString().padStart(8)} | Class:${c.subClass.padStart(12)}
`
    }
    if (c._weaponAccuracy.length > 0) {
        weaponAccuracy = `\n`;
    }
    c._weaponAccuracy.forEach(skill => {
        weaponAccuracy+= `acc: ${skill.weapon.padEnd(15)}${skill.accuracy.toString().padStart(3)}% |\n`;
    });
    if (c._skills.length > 0) {
        skills = `\n`;
    }
    c._skills.forEach(skill => {
        if (skill.rating > 0) {
            skills+= `${skill.skill.padEnd(24)}${skill.rating.toString().padStart(3)}% | ${skill.points.toString().padStart(3)}\n`
        }
    });
    c._abilitySets.forEach(abilitySet => {
        abilities+= `
${abilitySet.padEnd(20)}         Action
-----------------------------------\n`;
        c._abilities.forEach(ability => {
            if (ability.abilitySet.includes(abilitySet)){
                let action = "";
                if (ability.type == "Slow") {
                    action = `Slow (CT ${ability.chargeTime})`;
                } else if ((ability.type == "Magic") && (ability.mpCost > 0)) {
                    action = `Magic (${ability.mpCost} MP)`;
                } else {
                    action = ability.type;
                }
                abilities+=`${ability.name.padEnd(20)} ${action.padStart(14)}\n`;
            }
        });
        abilities+=`\n`;
    });
    if (c._equipWeapon) {
        items+=`${c._equipWeapon.name.padEnd(19)} ${c._equipWeapon.type.toLowerCase().substring(0,8).padStart(8)} | ${c._equipWeapon.slot.toLowerCase().substring(0,4)}\n`;
    }
    if (c._equipShield) {
        items+=`${c._equipShield.name.padEnd(19)} ${c._equipShield.type.toLowerCase().substring(0,8).padStart(8)} | ${c._equipShield.slot.toLowerCase().substring(0,4)}\n`;
    }
    if (c._equipBody) {
        items+=`${c._equipBody.name.padEnd(19)} ${c._equipBody.type.toLowerCase().substring(0,8).padStart(8)} | ${c._equipBody.slot.toLowerCase().substring(0,4)}\n`;
    }
    if (c._equipHead) {
        items+=`${c._equipHead.name.padEnd(19)} ${c._equipHead.type.toLowerCase().substring(0,8).padStart(8)} | ${c._equipHead.slot.toLowerCase().substring(0,4)}\n`;
    }
    if (c._equipHands) {
        items+=`${c._equipHands.name.padEnd(19)} ${c._equipHands.type.toLowerCase().substring(0,8).padStart(8)} | ${c._equipHands.slot.toLowerCase().substring(0,4)}\n`;
    }
    if (c._equipAccessories) {
        items+=`${c._equipAccessories.name.padEnd(19)} ${c._equipAccessories.type.toLowerCase().substring(0,8).padStart(8)} | ${c._equipAccessories.slot.toLowerCase().substring(0,4)}\n`;
    }
    c._equipInventory.forEach(item =>{
        items+=`${item.name.padEnd(19)} ${item.type.toLowerCase().substring(0,8).padStart(8)} | ${item.slot.toLowerCase().substring(0,4)}\n`;
    });
    // Respond
    const msg = await message.channel.send("Please wait; Processing, kupo..");
    const embed = new Discord.RichEmbed()
        .setThumbnail("http://ffrpg3bot.gaius.online/images/cid.large.png")
        .setColor(0x7D3C98)
        .setTitle(`**${c.name}**, ${message.author.username}'s Character`)
        .addField(
// 35 Character limit ends here > |
`Character Details`,`\`\`\`
Full name: ${c._fullname}
Notes: ${c._bio}
-----------------------------------
Race: ${c.race.padStart(8)} | Job:${c._job.padStart(14)}
Level:${c.mainLevel.toString().padStart(8)} | Class:${c.mainClass.padStart(12)}${subclass}
Exp: ${c.experiencePts.toString().padStart(9)} | Next Lv: ${c._expToNextLevel.toString().padStart(9)}

Attributes      Equip Total  Max
-----------------------------------
Strength   ${c.attrStr.padStart(3)} | ${c._inventoryAttrMods.str.toString().padStart(3)} | ${c._attrStrTotal.toString().padStart(3)} | ${c._attrStrMax.toString().padStart(3)}
Vitality   ${c.attrVit.padStart(3)} | ${c._inventoryAttrMods.vit.toString().padStart(3)} | ${c._attrVitTotal.toString().padStart(3)} | ${c._attrVitMax.toString().padStart(3)}
Agility    ${c.attrAgi.padStart(3)} | ${c._inventoryAttrMods.agi.toString().padStart(3)} | ${c._attrAgiTotal.toString().padStart(3)} | ${c._attrAgiMax.toString().padStart(3)}
Speed      ${c.attrSpd.padStart(3)} | ${c._inventoryAttrMods.spd.toString().padStart(3)} | ${c._attrSpdTotal.toString().padStart(3)} | ${c._attrSpdMax.toString().padStart(3)}
Magic      ${c.attrMag.padStart(3)} | ${c._inventoryAttrMods.mag.toString().padStart(3)} | ${c._attrMagTotal.toString().padStart(3)} | ${c._attrMagMax.toString().padStart(3)}
Spirit     ${c.attrSpr.padStart(3)} | ${c._inventoryAttrMods.spr.toString().padStart(3)} | ${c._attrSprTotal.toString().padStart(3)} | ${c._attrSprMax.toString().padStart(3)}
\`\`\``).addField(
// 35 Character limit ends here > |
`Combat Statistics`,`\`\`\`
           die   Current       Max
-----------------------------------
Health Pts ${c._hpDie.padStart(3)} | ${c.currentHP.toLocaleString().padStart(7)} | ${c.maxHP.toLocaleString().padStart(7)}
Magic Pts  ${c._mpDie.padStart(3)} | ${c.currentMP.toLocaleString().padStart(7)} | ${c.maxMP.toLocaleString().padStart(7)}

                             Magic
-----------------------------------
Dexterity           ${c._dexterity.toString().padStart(3)}  |
Mind                ${c._mind.toString().padStart(3)}  |
Evasion             ${c._evasion.toString().padStart(3)}  |    ${c._magicEvasion.toString().padStart(3)} 
Armor               ${c._armor.toString().padStart(3)}  |    ${c._magicArmor.toString().padStart(3)}
Accuracy (Base)     ${c._baseAccuracy.toString().padStart(3)}% |    ${c._magicAccuracy.toString().padStart(3)}%${weaponAccuracy}
\`\`\``).addField(
// 35 Character limit ends here > |
`Skills, Dis/Advantages & Traits`,`\`\`\`
Skill                 Rating   Pts
-----------------------------------${skills}
\`\`\``).addField(
// 35 Character limit ends here > |
`Class Abilities`,`\`\`\`${abilities}
\`\`\``).addField(
// 35 Character limit ends here > |
`Equipment & Inventory`,`\`\`\`
Carrying Capacity: (${c._inventoryCount}/${c._inventoryCapacity})

Item                    Type   Slot 
-----------------------------------${items}
\`\`\``)
        .setFooter("http://ffrpg3bot.gaius.online 🐙🇵🇭");
    msg.edit({embed});
}
