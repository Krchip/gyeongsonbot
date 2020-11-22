const { sendDenied } = require('../util/embed');
const Discord = require('discord.js');
const { owners } = require('../config.json');

module.exports = {
    name: '실행',
    description: 'eval 커맨드',
    excute(client, message, args) {
        if(owners.some(word => message.author.id.includes(word))) {
			let embed2 = new (Discord.MessageEmbed)
					embed2.setAuthor(message.author.username, message.author.avatarURL())
					embed2.setTitle("오류")
					embed2.setDescription("잘못된 클라이언트 종료 방식입니다.")
					embed2.setColor('RED')
		
			let text = args.join(' ')
		
			if(text.indexOf("exit") != -1 && text.indexOf("process") != -1) {
				return message.channel.send(embed2);
			} else {
				const result = new Promise(resolve => resolve(eval(text)));
				return result.then(output => {
					if(typeof output !== "string")
						output = require('util').inspect(output, {
							depth: 0
						});
												
					if(output.includes(client.token))
						output = output.replace(client.token, "토큰");
					if(output.length > 1010)
						output = (output.slice(0, 1010)+"\n...");
										
					let embed = new (Discord.MessageEmbed)
							embed.setColor("#5fe9ff")
							embed.setDescription('입력 :\n```js\n' + text + '\n```\n출력 :```js\n' + output + '\n```')
					message.channel.send({ embed: embed });
				}).catch(error => {
					error = error.toString();
					error = error.replace(client.token, "토큰");
										
					if(error.includes(client.token))
						error = error.replace(client.token, "토큰");
										
					let embed = new (Discord.MessageEmbed)
							embed.setAuthor(message.author.username, message.author.avatarURL())
							embed.setTitle("오류")
							embed.setDescription(error)
							embed.setColor('RED')
					message.channel.send({ embed: embed });
				})
			}
		} else {
			return sendDenied("해당 명령어를 사용할 권한이 없습니다. 권한을 다시 확인해주세요!", message.channel);
		}
	}
}