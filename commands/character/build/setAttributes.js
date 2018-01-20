exports.subcommands = ["setattr", "setAttr", "setattributes", "setAttributes"];
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
    // Check if attributes are correct
    if (args.length != 7) {
        message.author.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            `Unable to parse command. Please use '/mog character ${charactername} build setAttributes *str* *vit* *agi* *spd* *mag* *spr*' to set your attributes.`);
        return;
    }
    let attrStr = args[1],
        attrVit = args[2],
        attrAgi = args[3],
        attrSpd = args[4],
        attrMag = args[5],
        attrSpr = args[6];
    // Process
    await client.db[authorId].get("characters").find({name:charactername}).assign({ 
        attrStr:attrStr,
        attrVit:attrVit,
        attrAgi:attrAgi,
        attrSpd:attrSpd,
        attrMag:attrMag,
        attrSpr:attrSpr
    }).write();
    let c = await client.db[authorId].get("characters").find({name:charactername}).value();
    message.author.send(
`Character Builder: **${charactername}**

                    | Str | Vit | Agi | Spd | Mag | Spr
--------------------------------------------------------
Attributes          | ${c.attrStr.padStart(3)} | ${c.attrVit.padStart(3)} | ${c.attrAgi.padStart(3)} | ${c.attrSpd.padStart(3)} | ${c.attrMag.padStart(3)} | ${c.attrSpr.padStart(3)}
Attrubute Rating    | ${((c.attrStr * 3) + 10).toString().padStart(3)} | ${((c.attrVit * 3) + 10).toString().padStart(3)} | ${((c.attrAgi * 3) + 10).toString().padStart(3)} | ${((c.attrSpd * 3) + 10).toString().padStart(3)} | ${((c.attrMag * 3) + 10).toString().padStart(3)} | ${((c.attrSpr * 3) + 10).toString().padStart(3)}`
        ,{code: "asciidoc"});
};
