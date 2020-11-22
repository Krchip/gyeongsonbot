const { sendError, sendDenied } = require("../util/embed");
const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "뮤트",
    description: "뮤트 커맨드",
    excute(client, message) {
        if (!message.member.hasPermission("MANAGE_ROLES")) return sendDenied("해당 명령어를 사용할 권한이 없습니다. 권한을 다시 확인해주세요!", message.channel);
        let args = message.content.substring("경손아 ".length).split(" ");

        switch (args[0]) {
            case "뮤트":
                var member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                if (!member) return sendError("요청하신 유저를 찾을 수 없어요. 다시 시도해주세요.", message.channel);

                let role = message.guild.roles.cache.find((role) => role.name === "뮤트");
                let muteembed = new Discord.MessageEmbed()
                    .setColor("#7dcbff")
                    .setAuthor(`${member.user.tag} 님이 뮤트되었어요.`)
                    .setDescription("이 뮤트에 이의가 있으신경우, 해당 뮤트를 한 관리자에게 문의해주세요.")
                    .setTimestamp();

                let unmuteembed = new Discord.MessageEmbed()
                    .setColor("#7dcbff")
                    .setAuthor(`${member.user.tag} 님은 더이상 뮤트가 아니에요!`)
                    .setDescription("뮤트가 해제되었어요. 아직도 채팅이 쳐지지않거나, 뮤트 역할이 빠지지 않았다면 관리자에게 문의해주세요.")
                    .setTimestamp();

                if (!role) return sendError("`뮤트` 역할이 서버에 존재하는지 확인해주세요. 해당 역할이 존재함에도 지속적인 오류가 발생할 경우, 개발자(Chip_#8346) 에게 문의해주세요.", message.channel);

                let time = args[2];
                if (!time) {
                    return sendError("시간이 설정되어있지 않아, 명령어를 사용할 수 없어요.", message.channel);
                }

                member.roles.add(role.id);

                message.channel.send(muteembed);

                setTimeout(function () {
                    member.roles.remove(role.id);
                    console.log(role.id);
                    message.channel.send(unmuteembed);
                }, ms(time));
        }
    },
};
