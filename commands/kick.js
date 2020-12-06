const error = require("../util/embed")

module.exports = {
    name: "추방",
    description: "추방 커맨드",
    excute(_, message) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return error.denyofuse(message, "KICK_MEMBERS")
        let member = message.mentions.members.first()

        if (!member) return error.invaildCommand(message, "경손아 추방 < 멘션 >")

        member
            .kick()
            .then(() => {
                return message.react("✅")
            })
            .catch((err) => {
                return error.unexpectedError(message, err)
            })
    },
}
