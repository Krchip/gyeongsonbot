const error = require("../util/embed")

module.exports = {
    name: "청소",
    description: "청소",
    excute(_, message, args) {
        let purge = args[0]
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return error.denyofuse(message, "MANAGE_MESSAGES")

        if (!purge) return error.invaildCommand(message, "경손아 청소 < 1~100 >")
        if (isNaN(purge) == true || message.content.indexOf(".") != -1) return error.invaildCommand(message, "경손아 청소 < 1~100 >")

        if (purge > 100) return error.invaildCommand(message, "경손아 청소 < 1~100 >")
        if (purge < 1) return error.invaildCommand(message, "경손아 청소 < 1~100 >")

        message.delete().catch((err) => error.unexpectedError(message, err))
        message.channel
            .bulkDelete(purge)
            .catch(() => message.channel.send(`<@${message.author.id}> 14일이 지나서 삭제할 수 없습니다.`))
            .then(() => {
                message.channel.send(`<@${message.author.id}> ${purge}개의 메세지를 삭제하였습니다!`).then((msg) => msg.delete({ timeout: 3000 }))
            })
    },
}
