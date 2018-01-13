module.exports = class discord {
    constructor(token,owner,admins,support) {
      	const Discord = require("discord.js");
		const { promisify } = require("util");
		const readdir = promisify(require("fs").readdir);
		const Enmap = require("enmap");
		const EnmapLevel = require("enmap-level");
		const client = new Discord.Client();
		// Setup Client Config
		client.config = {
			"ownerID": owner,
			"admins": admins,
			"support": support,
			"token": token,
			"defaultSettings" : {
				"prefix": "/mog",
				"modLogChannel": "mod-log",
				"modRole": "Moderator",
				"adminRole": "Administrator",
				"systemNotice": "true",
				"welcomeChannel": "welcome",
				"welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
				"welcomeEnabled": "false"
			},
			permLevels: [
				{ level: 0,
				name: "Spectator", 
				check: () => true
				},
				{ level: 1,
				name: "Player",
				check: (message) => {
						try {
							const playerRole = message.guild.roles.find(r => r.name.toLowerCase() === ("player"));
							if (playerRole && message.member.roles.has(playerRole.id)) return true;
						} catch (e) {
							return false;
						}
					}
				},
				{ level: 2,
				name: "Storyteller",
				check: (message) => {
						try {
							const storytellerRole = message.guild.roles.find(r => r.name.toLowerCase() === ("storyteller"));
							if (storytellerRole && message.member.roles.has(storytellerRole.id)) return true;
						} catch (e) {
							return false;
						}
					}
				},
				{ level: 3,
				name: "Worldbuilder",
				check: (message) => {
						try {
							const worldbuilderRole = message.guild.roles.find(r => r.name.toLowerCase() === ("worldbuilder"));
							if (worldbuilderRole && message.member.roles.has(worldbuilderRole.id)) return true;
						} catch (e) {
							return false;
						}
					}
				},
				{ level: 4,
				name: "Moderator",
				check: (message) => {
						try {
							const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
							if (modRole && message.member.roles.has(modRole.id)) return true;
						} catch (e) {
							return false;
						}
					}
				},
				{ level: 5,
				name: "Administrator", 
				check: (message) => {
						try {
							const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
							return (adminRole && message.member.roles.has(adminRole.id));
						} catch (e) {
							return false;
						}
					}
				},
				{ level: 6,
				name: "Server Owner", 
				check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
				},
				{ level: 8,
				name: "Bot Support",
				check: (message) => support.includes(message.author.id)
				},
				{ level: 9,
				name: "Bot Admin",
				check: (message) => admins.includes(message.author.id)
				},
				{ level: 10,
				name: "Bot Owner",
				check: (message) => message.client.config.ownerID === message.author.id
				}
			]
		};
		client.logger = require("./util/Logger");
		require("./modules/functions.js")(client);
		client.commands = new Enmap();
		client.aliases = new Enmap();
		client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});
		const init = async () => {
			const cmdFiles = await readdir("./commands/");
			client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
			cmdFiles.forEach(f => {
			  	if (!f.endsWith(".js")) return;
			  	const response = client.loadCommand(f);
			  	if (response) console.log(response);
			});
			const evtFiles = await readdir("./events/");
			client.logger.log(`Loading a total of ${evtFiles.length} events.`);
			evtFiles.forEach(file => {
			  	const eventName = file.split(".")[0];
			  	const event = require(`./events/${file}`);
			  	client.on(eventName, event.bind(null, client));
			  	delete require.cache[require.resolve(`./events/${file}`)];
			});
			client.levelCache = {};
			for (let i = 0; i < client.config.permLevels.length; i++) {
			  	const thisLevel = client.config.permLevels[i];
			  	client.levelCache[thisLevel.name] = thisLevel.level;
			}
			client.login(client.config.token);
		};
		init();
    }
}
