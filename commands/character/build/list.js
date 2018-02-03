const Discord = require("discord.js");
exports.subcommands = ["l","ls","list","help"];
exports.run = async (client, message, args, level, charactername) => {
    // Respond
    message.author.send(
`Welcome to the **FFRPG3 Character builder**, kupo! You may use the following commands **via Direct Message** below to build your character '${ charactername }'! Note that you can change your character any number of times as long as they are not being used in an ongoing campaign, kupo~

• **/mog character ${charactername} build setRace *race***
  This command will set your character's race! You can use the command '/mog world *worldname* race' on your Discord Server to find out which races are available in your storyteller's world!
• **/mog character ${charactername} build setClass *class***
  This command will set your character's class! You can use the command '/mog world *worldname* class' on your Discord Server to find out which classes are available in your storyteller's world! Note that this command will clear all of your learned abilities, set your character's class level and experience point back to zero.
• **/mog character ${charactername} build setAttributes *str* *vit* *agi* *spd* *mag* *spr***
  This command will set your character's attributes! For a level 1 character, make sure that the total amount will equal exactly to 40, kupo!`);// +
//• **/mog character ${charactername} build takeBasicTraitsTest***
//  This command will start the Traits Test, to find out how your character will earn Key Points.
//• **/mog character ${charactername} build addAdvTrait *advTrait***
//  This command will add an Advanced Trait to your character! These are extra ways to earn and spend Key Points, but make sure your Storyteller knows and approves of this beforehand! Use the command '/mog world *worldname* advTraits' on your Discord Server to find out which advanced traits are available in your world.
//• **/mog character ${charactername} build removeAdvTrait *advTrait***
//  This command will remove an Advanced Trait from your character!
//• **/mog character ${charactername} build addAdvantage *advantage***
//  This command will add an Advantage to your character! You can use the command '/mog world *worldname* advantage' on your Discord Server to find out which advantages are available in your storyteller's world!
//• **/mog character ${charactername} build removeAdvantage *advantage***
//  This command will remove an Advantage from your character!
//• **/mog character ${charactername} build addDisadvantage *disadvantage***
//  This command will add a Disvantage to your character! You can use the command '/mog world *worldname* disadvantage' on your Discord Server to find out which disadvantages are available in your storyteller's world!
//• **/mog character ${charactername} build removeDisadvantage *disadvantage***
//  This command will remove a Disadvantage from your character!
message.author.send(`Continued...

• **/mog character ${charactername} build addItem *item***
  This command will add an Item to your Character's Inventory! You can use the command '/mog world *worldname* item *type* *tier*' on your Discord Server to find out which items are available in your storyteller's world! Note that items w/o tiers cannot be listed this way!
• **/mog character ${charactername} build removeItem *item***
  This command will remove an Item from your Character's Inventory!
• **/mog character ${charactername} build equipItem *slot* *item***
  This command will equip your character with an item from its inventory into one of the following slots: weapon, shield, head, hands, body or accessory.
• **/mog character ${charactername} build unequipItem *slot***
  This command will unequip an item from your character on one of the following slots: weapon, shield, head, hands, body or accessory.
• **/mog character ${charactername} build addSkill *qty* *skill***
  This command will use 'qty' skill points from your Class and acquire or improve your Character's Skill Rating! This automatically applies Skill Aptitudes, double cost skills and Lore/Language only skills. For a level 1 character, make sure that no skill exceeds skill rating 50.
• **/mog character ${charactername} build removeSkill *qty* *skill***
  This command will refund 'qty' skill points from your class and turn it back into skill points
• **/mog character ${charactername} build setExperience *exp***
  This command sets your character's experience points.
• **/mog character ${charactername} build levelup**
  This command will level up your character by one, assuming you have enough experience points.
• **/mog character show ${charactername}**
  This command will show your character sheet.
• **/mog character check ${charactername} *worldname***
  This command will check if your character is valid for a given storyteller's world.`);
    if (message.guild.id) {
        const embed = new Discord.RichEmbed()
            .setAuthor("Cidolfus \"The Super Moogle\" Artemicion", "http://ffrpg3bot.gaius.online/images/cid.small.gif")
            .setThumbnail("http://ffrpg3bot.gaius.online/images/cid.large.png")
            .setColor(0x7D3C98)
            .setDescription(`Sending a Direct message to **${ message.author.username }**, kupo! Good luck~`)
            .setFooter("http://ffrpg3bot.gaius.online 🐙🇵🇭");
        message.channel.send({embed});
    }
}
