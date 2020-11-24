const error = require("../util/embed")

module.exports = {
    name: "차단",
    description: "차단 커맨드",
    excute(_, message) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return error.denyofuse(message, "BAN_MEMBERS")
        let args = message.mentions.members.first()

        if (!args) return error.invaildCommand(message, "경손아 차단 < 멘션 >")

        let member = message.mentions.members.first()

        member
            .ban()
            .then(() => {
                return message.react("✅")
            })
            .catch((err) => {
                return error.unexpectedError(message, err)
            })
    },
}
