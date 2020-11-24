const error = require("../util/embed")

module.exports = {
    name: "이름설정",
    description: "이름설정 커맨드",
    excute(_, message, args) {
        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return error.denyofuse(message, "MANAGE_NICKNAMES")

        let member = message.mentions.members.first()

        let string = ""
        for (let i = 1; i < args.length; i++) {
            string += args[i] + " "
        }

        if (!args[0] || !args[1]) return error.invaildCommand(message, "경손아 이름설정 < @멘션 > < 이름 >")

        member
            .setNickname(string)
            .then(() => {
                return message.react("✅")
            })
            .catch((err) => {
                return error.unexpectedError(message, err)
            })
    },
}
