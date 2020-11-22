const { sendDenied, sendError } = require("../util/embed");

module.exports = {
    name: "이름설정",
    description: "이름설정 커맨드",
    excute(_, message, args) {
        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return sendDenied(message.channel);

        let member = message.mentions.members.first();

        let string = "";
        for (let i = 1; i < args.length; i++) {
            string += args[i] + " ";
        }

        if (!args[0] || !args[1])
            return sendError("잘못된 명령어입니다! `경손아 이름설정 [유저 멘션] [이름]` 이 올바른 명령어 입니다.\n\n또는, 해당 명령어를 봇에게 사용할 수 없습니다.", message.channel);

        member
            .setNickname(string)
            .then(() => {
                return message.react("✅");
            })
            .catch(() => {
                return error.equalPerms(message);
            });
    },
};
