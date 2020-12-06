const moment = require("moment")
require("moment-timezone")
moment.tz.setDefault("Asia/Seoul")
const config = require("../config.json")
const embed = require("../tools/embed")

module.exports = {
    name: "블랙리스트",
    description: "블랙 커맨드",
    async excute(_client, message, args, _embed, knex) {
        if (config.OWNERS.some((word) => message.author.id.includes(word))) {
            if (args[0] === "추가") {
                if (args[1] !== undefined && args[2] !== undefined) {
                    let member
                    message.mentions.members.first() ? (member = message.mentions.members.first().id) : (member = args[1])
                    let _reason = ""
                    let _time = moment().format("YYYY년 MM월 DD일 HH시 MM분")
                    for (let i = 2; i < args.length; i++) {
                        _reason += args[i] + " "
                    }
                    await knex("blacks").insert({
                        id: member,
                        reason: _reason,
                        time: _time,
                        admin: message.author.username + "#" + message.author.discriminator,
                    })
                    embed.setDescription(`${member} ID 를 성공적으로 블랙리스트에 추가했습니다.`)
                    message.reply(embed)
                } else {
                    embed.setDescription(`\`${config.PREFIX} ${this.name} 추가 [유저] [사유]\` 가 올바른 명령어입니다.`)
                    message.reply(embed)
                }
            } else if (args[0] === "제거") {
                if (args[1] !== undefined) {
                    let member
                    message.mentions.members.first() ? (member = message.mentions.members.first().id) : (member = args[1])
                    await knex("blacks").where({ id: member }).del()
                    embed.setDescription(`${member} ID 를 성공적으로 블랙리스트에서 제거했습니다.`)
                    message.reply(embed)
                } else {
                    embed.setDescription(`\`${config.PREFIX} ${this.name} 제거 [유저]\` 가 올바른 명령어입니다.`)
                    message.reply(embed)
                }
            }
        } else {
            embed.setDescription("봇 관리자만 수행할 수 있는 명령어입니다.")
            message.reply(embed)
        }
    },
}
