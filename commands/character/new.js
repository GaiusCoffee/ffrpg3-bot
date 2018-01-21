const Discord = require("discord.js");
exports.subcommands = ["n","new"];
exports.run = async (client, message, args, level) => {
    // Parameters
    let authorId = message.author.id;
    // Validate
    if (args.length < 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Character Name Required!");
    } else if (args.length > 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Character Name cannot contain spaces! You can enter the character's full name later, use a one word nickname for now.");
    } else if (await client.db[authorId].get("characters").find({ name:args[1] }).value()) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Character already exists!");
    } else {
        // Process
        let charactername = args[1];
        const msg = await message.channel.send("Please wait; Creating your character, kupo..");
        await client.db[authorId].get("characters").push({
            name:charactername,
            race:"Human",
            mainClass:"Freelancer",
            mainJob:"Expert",
            mainLevel:0,
            subClass:"",
            subJob:"",
            subLevel:0,
            fullname:"",
            bio:"",
            attrStr:0,
            attrVit:0,
            attrAgi:0,
            attrSpd:0,
            attrMag:0,
            attrSpr:0,
            traits:[],
            advantages:[],
            advantagesScore:0,
            disadvantages:[],
            disadvantagesScore:0,
            equipInventory:[],
            maxHP:0,
            currentHP:0,
            maxMP:0,
            currentMP:0,
            skills:[],
            skillPtsGeneral:0,
            skillPtsLoreLang:160,
            mainAbilities:[],
            subAbilities:[],
            experiencePts:0,
            statusEffects:[],
            status:"Invalid",
            hpRolls:[],
            mpRolls:[]
        }).write();
        // Respond
        const embed = new Discord.RichEmbed()
            .setAuthor("Cidolfus \"The Super Moogle\" Artemicion", "http://ffrpg3bot.gaius.online/images/cid.small.gif")
            .setThumbnail("http://ffrpg3bot.gaius.online/images/cid.large.png")
            .setColor(0x7D3C98)
            .setTitle(`The Characters of ${ message.author.username }`)
            .setDescription(
`A new character has been created, kupo!

**${ charactername }**, a Lv0 Human Freelancer!

To further build this character, use the '/mog character ${ charactername } build' command!`)
            .setFooter("http://ffrpg3bot.gaius.online 🐙🇵🇭");
        msg.edit({embed});
    }
}
