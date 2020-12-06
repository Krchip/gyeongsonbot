const Discord = require("discord.js")

module.exports = (client, message) => {
    const embed = new Discord.MessageEmbed()
    embed.setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    embed.setTimestamp(new Date())
    embed.setColor("#4178ff")
    return embed
}
