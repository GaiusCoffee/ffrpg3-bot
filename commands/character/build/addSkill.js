exports.subcommands = ["addskill", "addSkill"];
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
    // Check if skill exists
    let qty,skillName,skillList="";
    args.shift();
    if (args.length < 2){
        message.author.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            `Unable to find the skill your entered.`);
        return;
    }
    qty = args[0];
    args.shift();
    skillName = args.join(" ");
    if (isNaN(qty)) {
        message.author.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            `Quantity of skill points should be numeric.`);
        return;
    }
    if (!await client.gamedata.skills.get("all").find({name:skillName}).value()){
        message.author.send(
            "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
            `Skill not found. Use '/mog world *worldname*'`);
        return;
    }
    // Check if there are enough skill points
    let skillType = "";
    if (skillName.startsWith("Lore") || skillName.startsWith("Language")) {
        if (await client.db[authorId].get("characters").find({ name:charactername }).value().skillPtsLoreLang < qty) {
            message.author.send(
                "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
                `Quantity less than available free skill points. If you have enough experience points, try the command '/mog character ${charactername} build levelup'.`);
            return;
        } else {
            skillType = "LnL";
        }
    } else {
        if (await client.db[authorId].get("characters").find({ name:charactername }).value().skillPtsGeneral < qty) {
            message.author.send(
                "🛑🛑 **ERROR** Kupopo!? **ERROR** 🛑🛑\n" + 
                `Quantity less than available free skill points. If you have enough experience points, try the command '/mog character ${charactername} build levelup'.`);
            return;
        } else {
            skillType = "Gen";
        }
    }
    // Process
    let skillCurrentPts = 0;
    await client.db[authorId].get("characters").find({name:charactername}).get("skills").value().forEach(element => {
        if (element.skill == skillName) {
            skillCurrentPts = element.points;
        }
    });
    if (skillCurrentPts > 0) {
        await client.db[authorId].get("characters").find({name:charactername}).get("skills").find({
            skill:skillName}).assign({points:+skillCurrentPts + +qty}).write();
    } else {
        await client.db[authorId].get("characters").find({name:charactername}).get("skills").push({
            skill:skillName,
            points:+qty
        }).write();
    }
    let unspentGenSP = await client.db[authorId].get("characters").find({name:charactername}).value().skillPtsGeneral,
        unspentLnLSP = await client.db[authorId].get("characters").find({name:charactername}).value().skillPtsLoreLang;
    if (skillType == "Gen") {
        await client.db[authorId].get("characters").find({name:charactername}).assign({
            skillPtsGeneral:+unspentGenSP - +qty
        }).write();
    } else if (skillType == "LnL") {
        await client.db[authorId].get("characters").find({name:charactername}).assign({
            skillPtsLoreLang:+unspentLnLSP - +qty
        }).write();
    }
    await client.db[authorId].get("characters").find({name:charactername}).get("skills").value().forEach(element => {
        if (element.points > 0) {
            skillList+=element.skill.padEnd(20) + "| " + element.points.toString().padStart(4) + "\n";
        }
    });
    unspentGenSP = await client.db[authorId].get("characters").find({name:charactername}).value().skillPtsGeneral;
    unspentLnLSP = await client.db[authorId].get("characters").find({name:charactername}).value().skillPtsLoreLang;
    message.author.send(
`Character Builder: **${charactername}**

Unspent skill points
  - General Skills:  ${unspentGenSP.toString().padStart(4)}
  - Lore & Language: ${unspentLnLSP.toString().padStart(4)}

Skill               | Points invested
-------------------------------------
${skillList}`
        ,{code: "asciidoc"});
};
