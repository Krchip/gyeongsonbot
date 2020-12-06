const error = require("../util/embed")
const Discord = require("discord.js")
const { PREFIX } = require("../config.json")
const MuteName = "뮤트"

module.exports = {
    name: "언뮤트",
    description: "언뮤트 커맨드",
    excute(_, message) {
        if (!message.member.hasPermission("MANAGE_ROLES")) return error.denyofuse(message, "MANAGE_ROLES")
        let args = message.content.substring(PREFIX.length).split(" ")

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
        if (!member) return error.send(message, "요청하신 유저를 찾을 수 없어요. 다시 시도해주세요.")

        let role = message.guild.roles.cache.find((role) => role.name === MuteName)
        let muteembed = new Discord.MessageEmbed().setColor("#7dcbff").setAuthor(`${member.user.tag} 님이 언뮤트되었어요.`).setTimestamp()

        if (!role) return error.send(message, "`뮤트` 역할이 서버에 존재하는지 확인해주세요.")

        let hasrole = member.roles.cache.find((r) => r.name === MuteName)
        if (hasrole) {
            member.roles
                .remove(role.id)
                .then(() => {
                    message.channel.send({ embed: muteembed })
                })
                .catch((_error) => error.unexpectedError(message, _error))
        } else {
            error.send(message, "뮤트 상태가 아닙니다.")
        }
    },
}
