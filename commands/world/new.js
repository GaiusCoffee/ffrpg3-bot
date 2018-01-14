const Discord = require("discord.js");
exports.subcommands = ["n","new"];
exports.run = async (client, message, args, level) => {
    // Parameters
	let guildId = message.guild.id;
    // Validate
    if (args.length < 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Worldname Required!");
    } else if (args.length > 2) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Worldnames cannot contain spaces!");
    } else if (await client.db[guildId].get("worlds").find({ worldname:args[1] }).value()) {
        message.channel.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            "Worldname already exists!");
    } else {
        // Process
        let worldname = args[1];
        const msg = await message.channel.send("Please wait; Building world, kupo..");
        await client.db[guildId].get("worlds").push({ 
            "worldname":worldname, 
            "worldbuilder":message.author.username,
            "config":[
                { key:"useAdvantages", value:"false", default:"false", description:"Enables/disables advantages & disadvantages in character creation as well as their effects" },
                { key:"startingAdvantageValue", value:"0", default:"0", description:"Starting advantage value" },
                { key:"useRacialModifiers", value:"false", default:"false", description:"Enables/disables race modifiers" },
                { key:"useRacialSenses", value:"false", default:"false", description:"Enables/disables race sense on Awareness Checks" },
                { key: "useKeyPoints", value: "false", default:"false", description: "Enables/disables the accumulation of Key Points. If this is disabled, basic & advanced traits are automatically disabled"},
                { key:"useBasicTraits", value:"false", default:"false", description:"Enables/disables the use of Basic Traits, which are used to earn Key Points" },
                { key:"useAdvancedTraits", value:"false", default:"false", description:"Enables/disables the use of Advanced Traits, which can be used to earn (or spend) Key Points" }
            ],
            "custom":[],
            "disabled":[]
        }).write();
        // Respond
        const embed = new Discord.RichEmbed()
            .setAuthor("Cidolfus \"The Super Moogle\" Artemicion", "http://ffrpg3bot.gaius.online/images/cid.small.gif")
            .setThumbnail("http://ffrpg3bot.gaius.online/images/cid.large.png")
            .setColor(0x7D3C98)
            .setTitle(`The Worlds of ${ message.guild.name }`)
            .setDescription(`A new world has been created in this discord server, kupo!\n\n**${ worldname }**`)
            .setFooter("http://ffrpg3bot.gaius.online 🐙🇵🇭");
        msg.edit({embed});
    }
}
