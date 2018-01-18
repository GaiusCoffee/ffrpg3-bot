exports.subcommands = ["l","ls","list"];
exports.run = async (client, message, args, level, worldname) => {    
    // Parameters
	let guildId = message.guild.id,
        classList = [], classes = "";
    if (args.length >= 2) {
        args.shift();
        let classname = args.join(" ");
        // Get builtin
        classList = await client.gamedata.classes.get("all").find({ name:classname }).value();
        // Get custom
        // Remove disabled
        // Build classList
        if (!classList) {
            classes = `Apparently, this world has no classes called ${ classname }, kupo!`;
        } else {
            classes = 
`**${ classList.name }**

• Max | Str | Vit | Agi | Spd | Mag | Spr
  Attr ----------------------------------
        ${classList.attrMax.str.toString().padStart(3)} | ${classList.attrMax.vit.toString().padStart(3)} | ${classList.attrMax.agi.toString().padStart(3)} | ${classList.attrMax.spd.toString().padStart(3)} | ${classList.attrMax.mag.toString().padStart(3)} | ${classList.attrMax.spr.toString().padStart(3)}
• Job           : ${ classList.job }
• Hp Die        : ${ classList.hpDie }
• Mp Die        : ${ classList.mpDie }
• ACC Bonus     : +${ classList.accBonus }
• Lv1 Skill Pts : ${ classList.skillPoints }
• Skill Aptitude: ${ classList.skillAptitudes }
• Weapons       : ${ classList.weapons.join(",") }
• Armor         : ${ classList.armor.join(",") }
• Ability Set(s): ${ classList.abilitySets.join(",") }`;
        }
        // Respond
        message.channel.send(
`= ${ worldname } = World Class Details =

${ classes }`
            ,{code: "asciidoc"});

    } else {
        // Get builtin
        await client.gamedata.classes.get("all").value().forEach((element, index) => {
            classList.push(element);
        });
        // Get custom
        // Remove disabled
        // Build classList
        if (classList.length === 0) {
            classes = "Apparently, this world has no classes available except Freelancer, kupo!";
        } else {
            classes = "Class             Max | Str | Vit | Agi | Spd | Mag | Spr\n" +
                      "---------------------------------------------------------\n";
            classList.forEach((element, index) => {
                classes += `${ element.name.padEnd(12) }${ element.job.padStart(10) }` + 
                `| ${element.attrMax.str.toString().padStart(3)} ` +
                `| ${element.attrMax.vit.toString().padStart(3)} | ${element.attrMax.agi.toString().padStart(3)} `+
                `| ${element.attrMax.spd.toString().padStart(3)} | ${element.attrMax.mag.toString().padStart(3)} `+
                `| ${element.attrMax.spr.toString().padStart(3)}\n`;
            });
        }
        // Respond
        message.channel.send(
`= ${ worldname } = World Classes =

${ classes }

Use the '/mog *worldname* class list *classname*' command to view specific details regarding a class.`
            ,{code: "asciidoc"});

    }
}
