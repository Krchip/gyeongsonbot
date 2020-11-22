const { sendError, sendDenied } = require("../util/embed");

module.exports = {
    name: "추방",
    description: "추방 커맨드",
    excute(client, message) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return sendDenied("해당 명령어를 사용할 권한이 없습니다. 권한을 다시 확인해주세요!", message.channel);
        let args = message.mentions.members.first();
        if (!args) return sendError("잘못된 명령어입니다! `경손아 추방 [유저 멘션]` 이 올바른 명령어 입니다.", message.channel);

        let member = message.mentions.members.first();

        member
            .kick()
            .then(() => {
                return message.react("✅");
            })
            .catch(() => {
                return error.equalPerms(message);
            });
    },
};
