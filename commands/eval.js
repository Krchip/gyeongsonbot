const { denyofuse } = require("../util/embed.js")
const Discord = require("discord.js")
const { OWNERS } = require("../config.json")

module.exports = {
    name: "실행",
    description: "eval 커맨드",
    excute(client, message, args) {
        if (OWNERS.some((word) => message.author.id.includes(word))) {
            let text = args.join(" ")

            let shutdown = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setTitle("오류")
                .setDescription("잘못된 클라이언트 종료 방식입니다.")
                .setColor("RED")

            if (text.indexOf("exit") != -1 && text.indexOf("process") != -1) {
                return message.channel.send({ embed: shutdown })
            } else {
                const result = new Promise((resolve) => resolve(eval(text)))
                return result
                    .then((output) => {
                        if (typeof output !== "string")
                            output = require("util").inspect(output, {
                                depth: 0,
                            })

                        if (output.includes(client.token)) output = output.replace(client.token, "토큰")
                        if (output.length > 1010) output = output.slice(0, 1010) + "\n..."

                        let embed = new Discord.MessageEmbed().setColor("#5fe9ff").setDescription("입력 :\n```js\n" + text + "\n```\n출력 :```js\n" + output + "\n```")
                        message.channel.send({ embed: embed })
                    })
                    .catch((error) => {
                        error = error.toString()
                        error = error.replace(client.token, "토큰")

                        if (error.includes(client.token)) error = error.replace(client.token, "토큰")

                        let embed = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.avatarURL()).setTitle("오류").setDescription(error).setColor("RED")
                        message.channel.send({ embed: embed })
                    })
            }
        } else {
            return denyofuse(message, "BOT DEVELOPER")
        }
    },
}
