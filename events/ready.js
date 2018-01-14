module.exports = async client => {
	await client.wait(1000);
	client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");
	await client.guilds.forEach(async g => {
		if (!(await client.settings.get("guilds").find({ id:g.id }).value())) {
			await client.settings.get("guilds").push({ id:g.id, settings:client.config.defaultSettings }).write();
		}
	});
};
