exports.subcommands = ["setclass", "setClass"];
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
    // Check if class exists
    let className;
    if (args.length < 2) {
        message.author.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            `Unable to find the class your entered.`);
        return;
    } else {
        args.shift();
        className = args.join(" ");
        if (!await client.gamedata.classes.get("all").find({name:className}).value()) {
            message.author.send(
                "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
                `Unable to find the class your entered.`);
            return;
        }
    }
    // Process
    let oldClass = await client.db[authorId].get("characters").find({ name:charactername }).value().mainClass,
        newClass = await client.gamedata.classes.get("all").find({name:className}).value();
    await client.db[authorId].get("characters").find({ name:charactername }).assign({ 
        "mainClass":newClass.name,
        "mainJob":newClass.job,
        "mainLevel":0,
        "subClass":"",
        "subJob":"",
        "subLevel":0,
        "skillPtsLoreLang":0,
        "skillPtsGenereal":0,
        "skills":[]
    }).write();
    message.author.send(
`Character Builder: **${charactername}**

Race has been changed to ${ await client.db[authorId].get("characters").find({ name:charactername }).value().mainClass } (Previously: ${ oldClass }).`
        ,{code: "asciidoc"});
};
