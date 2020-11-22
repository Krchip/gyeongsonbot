const { sendDenied, sendError } = require("../util/embed");

module.exports = {
    name: "청소",
    description: "청소",
    excute(_, message, args) {
        let purge = args[0];
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return sendDenied(message.channel);

        if (!purge) return sendError("잘못된 명령어입니다. `경손아 청소 [1~1000]`이 올바른 명령어 입니다.", message.channel);
        if (isNaN(purge) == true || message.content.indexOf(".") != -1) return sendError("잘못된 명령어입니다. `경손아 청소 [1~1000]`이 올바른 명령어 입니다.", message.channel);

        if (purge > 100) return sendError("잘못된 명령어입니다. `경손아 청소 [1~100]`이 올바른 명령어 입니다.", message.channel);
        if (purge < 1) return sendError("잘못된 명령어입니다. `경손아 청소 [1~100]`이 올바른 명령어 입니다.", message.channel);

        try {
            message.delete();
            message.channel
                .bulkDelete(purge)
                .catch(() => message.channel.send(`<@${message.author.id}> 14일이 지나서 삭제할 수 없습니다.`))
                .then((msg) => msg.delete({ timeout: 3000 }));
            message.channel.send(`<@${message.author.id}> ${purge}개의 메세지를 삭제하였습니다!`).then((msg) => msg.delete({ timeout: 3000 }));
        } catch {
            sendError("명령어를 사용하던중 어떠한 이유로 오류가 발생했어요.");
        }
    },
};
