const Discord = require("discord.js")

module.exports = {
    name: "아바타",
    description: "아바타 커맨드",
    excute(_, message) {
        const user = message.mentions.users.first() || message.author

        if (!user) {
            let embed = new Discord.MessageEmbed()
            embed.setAuthor(message.author.username, message.author.avatarURL())
            embed.setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            embed.setColor("#4287f5")
            embed.setFooter("기본 프로필인 경우, 사진이 표시되지 않아요.")

            message.channel.send(embed)
        } else {
            let embed2 = new Discord.MessageEmbed()
            embed2.setAuthor(message.author.username, message.author.avatarURL())
            embed2.setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            embed2.setColor("#5fe9ff")
            embed2.setFooter("기본 프로필인 경우, 사진이 표시되지 않아요.")
            message.channel.send(embed2)
        }
    },
}
