const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require('./config.json');
const prefix = config.prefix;
const token = config.token;

bot.commands = new Discord.Collection();

bot.on('ready', () => {
	console.log(`Bot ${bot.user.username} is on`);
	bot.user.setPresence({game:{name:'for ' + prefix + 'help', type:'WATCHING'}});
});

bot.on('message', (message) => {
	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;
	
	if (message.content.substring(0, prefix.length) === prefix) {
		var args = message.content.substring(prefix.length).trim().split(/ +/g);
		
		switch (args[0].toUpperCase()) {
			case 'SWIFT': { //Swift
				if (message.author.id !== '334464604468019201') {
					message.channel.send('You can only use this command if you are the bot owner');
					return;
				}
				switch (args[1].toUpperCase()) {
					case 'PING': {
						message.channel.send('`' + bot.ping + 'ms`');
						break;
					}
					case 'SPAM': {
						var msg = message.mentions.members.first();
						message.channel.send(msg + msg + msg + msg + msg + msg + msg + msg + msg + msg);
						message.delete();
						break;
					}
					case 'SAY': {
						var msg = message.content.substring(12);
						message.channel.send(msg);
						message.delete();
						break;
					}
					case 'ADDROLE':
					case 'ROLEADD': {
						if (!message.mentions.roles.first()) {
							message.channel.send('Please input a role');
							return;
						}
						if (!message.mentions.roles.first()) {
							var mem = message.member;
						}
						else {
							var mem = message.mentions.members.first();
						}
						var role = message.mentions.roles.first();
						mem.addRole(role);
						message.channel.send('Added role ' + message.mentions.roles.first() + ' to ' + message.mentions.members.first());
						message.delete();
						break;
					}
					case 'REMOVEROLE':
					case 'ROLEREMOVE': {
						if (!message.mentions.roles.first()) {
							message.channel.send('Please input a role');
							return;
						}
						if (!message.mentions.roles.first()) {
							var mem = message.member;
						}
						else {
							var mem = message.mentions.members.first();
						}
						var role = message.mentions.roles.first();
						mem.removeRole(role);
						message.channel.send('Removed role ' + message.mentions.roles.first() + ' from ' + message.mentions.members.first());
						message.delete();
						break;
					}
					case 'NICKNAME': {
						if (!message.mentions.members.first()) {
							var mem = message.member;
							var lngth = args.length;
						}
						else {
							var mem = message.mentions.members.first();
							var lngth = args.length-1;
						}
						var nick = '';
						for (var i = 2;i<lngth;i++) {
							nick = nick + ' ' + args[i];
						}
						message.channel.send('Changed nickname of ' + mem + ' to **' + nick + '**');
						mem.setNickname(nick);
						break;
					}
				}
				break;
			} //End of swift
			case 'HELP': {
				const msg = new Discord.RichEmbed()
				.setTitle('Commands')
				.setDescription('__All commands for the Sushi Bot. Bot prefix is __\"' + prefix + '\"')
				.setColor('#3399ff')
				.addField('Help', 'Shows this message', true)
				.addField('Rules', 'Shows a list of rules', true)
				.addField('Punishments', 'Shows a list of punishments', true)
				.addField('Roll', 'Syntax: \"roll (num1)/(num2) (Optional | Decimals, Default: true)\". Rolls a random number between two numbers', true);
				message.channel.send(msg);
				break;
			}
			case 'RULES': {
				const msg = new Discord.RichEmbed()
				.setTitle('Rules')
				.setDescription('__A list of rules. If you break any rules, you will receive a punishment__')
				.setColor('#ff66ff')
				.addField('1.)', 'Be kind to everyone, even if they are annoying', true)
				.addField('2.)', 'No spamming chat', true)
				.addField('3.)', 'No innapropriate language, or pictures (Swearing is allowed, for now)', true)
				.addField('4.)', 'Do not abuse your role', true)
				.addField('5.)', 'No pictures of bunnys wearing fedora\'s', true)
				.addField('6.)', 'If someone is being very (da)rude (sandstorm), send them to the time-out chair', true)
				.addField('7.)', 'If you are being bullied, please tell an admin, or an co-owner, and they will help you with the situation', true)
				.addField('8.)', 'No politics', true);
				message.channel.send(msg);
				break;
			}
			case 'PUNISHMENTS': {
				const msg = new Discord.RichEmbed()
				.setTitle('Punishments')
				.setDescription('__A list of punishments__')
				.setColor('#cc0000')
				.addField('Time out chair', 'SIT IN THE TIME OUT CHAIR', true)
				.addField('Kick', 'Get removed from the server', true)
				.addField('Ban', 'Get removed from the server and can\'t come back for a certain amount of time', true)
				.addField('Perma-Ban', 'Get removed from the server and can\'t come back forever', true);
				message.channel.send(msg);
				break;
			}
			case 'ROLL': {
				if (!args[2]) args[2] = 'FALSE';
				if (!args[1] || args[2].toUpperCase() !== 'FALSE' && args[2].toUpperCase() !== 'TRUE') {
					message.channel.send('Incorrect Syntax!');
					return;
				}
				var nums = args[1].split('/');
				var num = Math.random()*(parseFloat(nums[1])-parseFloat(nums[0]))+parseFloat(nums[0]);
				if (args[2].toUpperCase() === 'FALSE') {
					var num = Math.floor(num);
				}
				message.channel.send('You rolled the number **' + num + '**');
				break;
			}
		}
	}
	else {
		var mem = message.guild.members.find('id', '404826846858051594');
		var prefixM = '(-';
		message.content = message.content.trim();
		if (mem.user.presence.status === 'offline' && message.content.substring(0, prefixM.length) === prefixM) {
			message.channel.send('Sorry, but the Sushi Music Bot is offline');
		}
	}
});

bot.login(token);