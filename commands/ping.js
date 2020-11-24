const Discord = require("discord.js")

module.exports = {
    name: "핑",
    description: "핑 커맨드",
    excute(client, message) {
        let embed = new Discord.MessageEmbed()
        embed.setTitle("현재 봇의 핑입니다!")
        embed.setDescription(`봇의 핑은... \`${client.ws.ping}ms\` 입니다!`)
        embed.setColor("#4287f5")
        embed.setTimestamp()
        message.channel.send(embed)
    },
}
