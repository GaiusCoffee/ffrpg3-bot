module.exports = class character {
    constructor(client){
        this.client = client;
    }
    async computeSheet(c) {
        c = await this.getInventory(c);
        c = await this.getDetails(c);
        c = await this.getAttr(c);
        c = await this.getSkills(c);
        c = await this.getStat(c);
        c = await this.getAbilities(c);

        return c;
    }
    async getInventory(c){
        c._inventoryAttrMods = {};
        c._inventoryAttrMods.str = 0;
        c._inventoryAttrMods.vit = 0;
        c._inventoryAttrMods.agi = 0;
        c._inventoryAttrMods.spd = 0;
        c._inventoryAttrMods.mag = 0;
        c._inventoryAttrMods.spr = 0;
        c._inventoryStatMods = {};
        c._inventoryStatMods.acc = 0;
        c._inventoryStatMods.macc = 0;
        c._inventoryStatMods.eva = 0;
        c._inventoryStatMods.meva = 0;
        c._inventoryStatMods.arm = 0;
        c._inventoryStatMods.marm = 0;
        c._inventoryStatMods.dex = 0;
        c._inventoryStatMods.mnd = 0;
        c._inventoryStatMods.hpFlat = 0;
        c._inventoryStatMods.hpPercent = 1;
        c._inventoryStatMods.mpFlat = 0;
        c._inventoryStatMods.mpPercent = 1;
        c._equipInventory = [];
        c.equipInventory.forEach(async item => {
            let i = await this.client.gamedata.items.get("all").find({name:item.name}).value(),
                t = {};
            t.id = item.id;
            t.name = i.name;
            t.type = i.type;
            t.slotFor = i.slot;
            t.slot = item.slot;
            t.tier = i.cost;
            t.avail = i.avail;
            t.weaponSkill = i.weaponSkill ? i.weaponSkill : "";
            t.dmgMulti = i.dmgMulti ? i.dmgMulti : "";
            t.dmgAttr = i.dmgAttr ? i.dmgAttr : "";
            t.dmgDice = i.dmgDice ? i.dmgDice : "";
            t.abilities = []; 
            i.abilities.forEach(async ability =>{
                t.abilities.push(ability);
                if (ability.startsWith('+') || ability.startsWith('-')) {
                    let s = ability.split(' ');
                    if (s.length == 2) {
                        if (s[1].toLowerCase() == "str") {c._inventoryAttrMods.str+=+s[0];}
                        else if (s[1].toLowerCase() == "vit") {c._inventoryAttrMods.vit+=+s[0];}
                        else if (s[1].toLowerCase() == "agi") {c._inventoryAttrMods.agi+=+s[0];}
                        else if (s[1].toLowerCase() == "spd") {c._inventoryAttrMods.spd+=+s[0];}
                        else if (s[1].toLowerCase() == "mag") {c._inventoryAttrMods.mag+=+s[0];}
                        else if (s[1].toLowerCase() == "spr") {c._inventoryAttrMods.spr+=+s[0];}
                        else if (s[1].toLowerCase() == "acc") {c._inventoryStatMods.acc+=+s[0];}
                        else if (s[1].toLowerCase() == "macc") {c._inventoryStatMods.macc+=+s[0];}
                        else if (s[1].toLowerCase() == "eva") {c._inventoryStatMods.eva+=+s[0];}
                        else if (s[1].toLowerCase() == "meva") {c._inventoryStatMods.meva+=+s[0];}
                        else if (s[1].toLowerCase() == "arm") {c._inventoryStatMods.arm+=+s[0];}
                        else if (s[1].toLowerCase() == "marm") {c._inventoryStatMods.marm+=+s[0];}
                        else if (s[1].toLowerCase() == "dex") {c._inventoryStatMods.dex+=+s[0];}
                        else if (s[1].toLowerCase() == "mnd") {c._inventoryStatMods.mnd+=+s[0];}
                        else if (s[1].toLowerCase() == "hp") {c._inventoryStatMods.hpFlat+=+s[0];}
                        else if (s[1].toLowerCase() == "%hp") {c._inventoryStatMods.hpPercent+=((+s[0])*0.01);}
                        else if (s[1].toLowerCase() == "mp") {c._inventoryStatMods.mpFlat+=+s[0];}
                        else if (s[1].toLowerCase() == "%mp") {c._inventoryStatMods.mpPercent+=((+s[0])*0.01);}
                    }
                }
            });
            if (i.evaBonus) {
                t.evaBonus=i.evaBonus;
                c._inventoryStatMods.eva+=i.evaBonus;
            } else { t.evaBonus=0; }
            if (i.mevaBonus) {
                t.mevaBonus=i.mevaBonus;
                c._inventoryStatMods.meva+=i.mevaBonus;
            } else { t.mevaBonus=0; }
            if (i.armBonus) {
                t.armBonus=i.armBonus;
                c._inventoryStatMods.arm+=i.armBonus;
            } else { t.armBonus=0; }
            if (i.marmBonus) {
                t.marmBonus=i.marmBonus;
                c._inventoryStatMods.marm+=i.marmBonus;
            } else { t.marmBonus=0; }
            t.target = i.target ? i.target : "";
            t.effect = i.effect ? i.effect : "";
            t.minQty = i.minQty ? i.minQty : 0;
            t.cast = i.cast ? i.cast : "";
            if (t.slot == "weapon") { c._equipWeapon = t; }
            else if (t.slot == "shield") { c._equipShield = t; }
            else if (t.slot == "body") { c._equipBody = t; }
            else if (t.slot == "head") { c._equipHead = t; }
            else if (t.slot == "hands") { c._equipHands = t; }
            else if (t.slot == "accessories") { c._equipAccessories = t; }
            else { c._equipInventory.push(t); }
        });
        return c;
    }
    async getDetails(c) {
        // Fullname
        if (c.fullname.length > 0) {
            c._fullname = c.fullname;
        } else {
            c._fullname = c.name;
        }
        // Bio
        c._bio = (c.bio.substr(0,28) + "\n" + 
            this.chunkSubstr(c.bio.substr(28),35).join("\n")).trim();
        // Job
        if (c.subClass.length > 0) {
            if (c.mainJob == c.subJob) {
                c._job = c.mainJob;
            } else {
                c._job = `${c.mainJob}/${c.subJob}`;
            }
        } else {
            c._job = c.mainJob;
        }
        // Experience
        c._totalLevel = c.mainLevel + c.subLevel;
        c._expToNextLevel = c._totalLevel > 0 ? (c._totalLevel - 1) * 500 : 0;
        return c;
    }
    async getAttr(c) {
        // Base Attributes
        c._attrStr = +c.attrStr;
        c._attrVit = +c.attrVit;
        c._attrAgi = +c.attrAgi;
        c._attrSpd = +c.attrSpd;
        c._attrMag = +c.attrMag;
        c._attrSpr = +c.attrSpr;
        // Race Max
        let race = await this.client.gamedata.races.get("all").find({race:c.race}).value();
        c._attrStrRaceMax = +race.attrMax.str;
        c._attrVitRaceMax = +race.attrMax.vit;
        c._attrAgiRaceMax = +race.attrMax.agi;
        c._attrSpdRaceMax = +race.attrMax.spd;
        c._attrMagRaceMax = +race.attrMax.mag;
        c._attrSprRaceMax = +race.attrMax.spr;
        // Class Max
        let mainClass = await this.client.gamedata.classes.get("all").find({name:c.mainClass}).value();
        c._attrStrClassMax = +mainClass.attrMax.str;
        c._attrVitClassMax = +mainClass.attrMax.vit;
        c._attrAgiClassMax = +mainClass.attrMax.agi;
        c._attrSpdClassMax = +mainClass.attrMax.spd;
        c._attrMagClassMax = +mainClass.attrMax.mag;
        c._attrSprClassMax = +mainClass.attrMax.spr;
        // Max Total
        c._attrStrMax = c._attrStrRaceMax + c._attrStrClassMax;
        c._attrVitMax = c._attrVitRaceMax + c._attrVitClassMax;
        c._attrAgiMax = c._attrAgiRaceMax + c._attrAgiClassMax;
        c._attrSpdMax = c._attrSpdRaceMax + c._attrSpdClassMax;
        c._attrMagMax = c._attrMagRaceMax + c._attrMagClassMax;
        c._attrSprMax = c._attrSprRaceMax + c._attrSprClassMax;
        // Total
        c._attrStrTotal = (c._attrStr+c._inventoryAttrMods.str) > 30 ? 30 : (c._attrStr+c._inventoryAttrMods.str);
        c._attrVitTotal = (c._attrVit+c._inventoryAttrMods.vit) > 30 ? 30 : (c._attrVit+c._inventoryAttrMods.vit);
        c._attrAgiTotal = (c._attrAgi+c._inventoryAttrMods.agi) > 30 ? 30 : (c._attrAgi+c._inventoryAttrMods.agi);
        c._attrSpdTotal = (c._attrSpd+c._inventoryAttrMods.spd) > 30 ? 30 : (c._attrSpd+c._inventoryAttrMods.spd);
        c._attrMagTotal = (c._attrMag+c._inventoryAttrMods.mag) > 30 ? 30 : (c._attrMag+c._inventoryAttrMods.mag);
        c._attrSprTotal = (c._attrSpr+c._inventoryAttrMods.spr) > 30 ? 30 : (c._attrSpr+c._inventoryAttrMods.spr);
        // Inventory
        c._inventoryCapacity = Math.floor(3+(c._attrStrTotal*3.2));
        c._inventoryCount = c.equipInventory.length;
        return c;
    }
    async getSkills(c) {
        let mainClass = await this.client.gamedata.classes.get("all").find({name:c.mainClass}).value(),
            rating = 0;
        c._skills = [];
        c.skills.forEach(async skill => {
            let s = await this.client.gamedata.skills.get("all").find({name:skill.skill}).value();
            if (s.rate != 1) {
                rating = (skill.points-(skill.points%2))*s.rate;
            } else if (s.category == mainClass.skillAptitudes) {
                rating = (skill.points*2)*s.rate;
            } else {
                rating = skill.points*s.rate;
            }
            c._skills.push({
                skill:skill.skill,
                points:skill.points,
                rating:rating
            });
        });
        return c;
    }
    async getStat(c) {
        let mainClass = await this.client.gamedata.classes.get("all").find({name:c.mainClass}).value();
        // HP/MP Dice
        c._hpDie = mainClass.hpDie;
        c._mpDie = mainClass.mpDie;
        // Evasion & Magic Evasion
        c._evasion = c._attrAgiTotal + c._attrSpdTotal + c._inventoryStatMods.eva;
        c._magicEvasion = c._attrSprTotal + c._attrMagTotal + c._inventoryStatMods.meva;
        // Armor & Magic Armor (TODO: Add Equipment Bonus)
        c._armor = (c._inventoryStatMods.arm+(((c._attrVitTotal+c._attrVitTotal%2)/2)*5))
        c._magicArmor = (c._inventoryStatMods.marm+(((c._attrSprTotal+c._attrSprTotal%2)/2)*5))
        // Dexterity & Mind
        c._dexterity = c._totalLevel+(c._attrAgiTotal*2)+50+c._inventoryStatMods.dex;
        c._mind = c._totalLevel+(c._attrMagTotal*2)+50+c._inventoryStatMods.mnd;
        // Accuracy
        c._baseAccuracy = c._totalLevel+(c._attrAgiTotal*2)+mainClass.accBonus+c._inventoryStatMods.acc;
        c._magicAccuracy = c._totalLevel+(c._attrMagTotal*2)+100+c._inventoryStatMods.macc;
        c._weaponAccuracy = [];
        c._skills.forEach(async skill => {
            let s = await this.client.gamedata.skills.get("all").find({name:skill.skill}).value();
            if (s.category == "Weapon") {
                c._weaponAccuracy.push({
                    weapon:skill.skill,
                    accuracy:c._baseAccuracy + skill.rating
                });
            }
        });
        return c;
    }
    async getAbilities(c){
        c._abilities = [];
        c._abilitySets = [];
        c.mainAbilities.forEach(async ability =>{
            let a = await this.client.gamedata.abilities.get("all").find({name:ability.name}).value();
            c._abilities.push(a);
            if (!c._abilitySets.includes(ability.abilitySet)){
                c._abilitySets.push(ability.abilitySet);
            }
        })
        c.subAbilities.forEach(async ability =>{
            let a = await this.client.gamedata.abilities.get("all").find({name:ability.name}).value();
            c._abilities.push(a);
            if (!c._abilitySets.includes(ability.abilitySet)){
                c._abilitySets.push(ability.abilitySet);
            }
        })
        return c;
    }
    // Utility Functions
    chunkSubstr(str, size) {
        const numChunks = Math.ceil(str.length / size)
        const chunks = new Array(numChunks)
        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = str.substr(o, size)
        }
        return chunks
    }
}
