const Discord = require('discord.js')

module.exports = {
    name: '봇정보',
    description: '봇 정보 커맨드',
    excute(_, message) {

        let embed = new Discord.MessageEmbed()
        .setTitle("경손봇의 정보를 제공해드릴게요!")
        .setDescription('호스팅: Discloud\n\n주요 서비스: 관리\n\n명령어 접두사: `경손아 `\n\n봇 초대링크: [이곳을 눌러 초대](https://bit.ly/경손봇)\n\n개발: 경손봇 개발팀')
        .setColor('#4287f5')
        .setTimestamp()

        message.channel.send(embed)
    }
}