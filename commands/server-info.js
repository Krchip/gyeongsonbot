const Discord = require("discord.js")

module.exports = {
    name: "정보",
    description: "서버 정보 커맨드",
    excute(client, message) {
        if (message.channel.type === "dm") return

        let embed = new Discord.MessageEmbed()
            .setTitle("서버 정보")
            .addField("서버 오너", `${message.guild.owner.displayName}`, true)
            .addField("서버 이름", `${message.guild.name}`, true)
            .addField("서버 봇 갯수", `${message.guild.members.cache.filter((x) => x.user.bot).size}`, true)
            .addField("서버 전체 인원", `${message.guild.memberCount} 명`, true)

        message.channel.send({ embed: embed })
    },
}
