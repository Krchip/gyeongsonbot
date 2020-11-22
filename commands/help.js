const Discord = require("discord.js");

module.exports = {
    name: "도움",
    description: "도움말 커맨드",
    excute(_, message) {
        let embed = new Discord.MessageEmbed()
            .setTitle("봇의 도움말을 제공해드릴게요!")
            .setDescription("모든 명령어 앞에는 접두사 `경손아 ` 를 붙혀주세요. [띄워쓰기 포함]")
            .addField("핑", "봇의 현재 핑을 확인합니다.")
            .addField("봇정보", "봇의 정보를 확인합니다. (핑 제외)")
            .addField("뮤트 [유저멘션]", "해당 기능을 사용하면, 해당 유저에게 **뮤트** 역할을 지급합니다. [역할설정 권한]")
            .addField("차단 [유저멘션]", "해당 기능을 사용하면, 해당 유저를 서버에서 **차단**  합니다. [차단 권한]")
            .addField("추방 [유저멘션]", "해당 기능을 사용하면, 해당 유저를 서버에서 **추방** 합니다. [추방 권한]")
            .addField("청소 [1~100]", "해당 기능을 사용하면, 해당 명령어를 사용한 채널에서 14일내 채팅기록중 [1~100] 만큼의 채팅을 삭제합니다. [메세지 관리 권한]")
            .addField("이름설정 [유저멘션] [원하는 이름]", "해당 기능을 사용하면, 해당 유저의 닉네임을 [원하는 이름] 으로 변경합니다. [이름 설정 권한]")
            .addField("한강", "한강의 현재 수온을 확인할 수 있습니다.")
            .setColor("#4287f5")
            .setTimestamp();

        message.channel.send(embed);
    },
};
