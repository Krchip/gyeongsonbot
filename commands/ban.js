const { sendDenied, sendError } = require("../util/embed");

module.exports = {
    name: "차단",
    description: "차단 커맨드",
    excute(_, message) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return sendDenied(message.channel);
        let args = message.mentions.members.first();

        if (!args) return sendError("잘못된 명령어입니다! `경손아 차단 [유저 멘션]` 이 올바른 명령어 입니다.", message.channel);

        let member = message.mentions.members.first();

        member
            .ban()
            .then(() => {
                return message.react("✅");
            })
            .catch(() => {
                return error.equalPerms(message);
            });
    },
};
