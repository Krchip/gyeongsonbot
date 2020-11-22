const { MessageEmbed } = require('discord.js');

module.exports.sendDenied = async (channel) => {
    let embed = new MessageEmbed()
    .setTitle("명령어 사용이 불가능 합니다.")
    .setColor("RED")
    .setDescription("죄송하지만, 해당 명령어를 실행할 권한이 존재하지 않습니다.")
    .setFooter("명령어 사용이 거부되었어요!")
    await channel.send(embed)
}

module.exports.sendError = async (text, channel) => {
    let embed = new MessageEmbed()
    .setTitle("오류가 발생했어요.")
    .setColor("RED")
    .setDescription(text)
    .setFooter("뭔가 오류가 발생했네요...")
    await channel.send(embed)
}

module.exports.equalPerms = async (text, channel) => {
    let embed = new MessageEmbed()
    .setTitle("봇의 권한이 부족해요.")
    .setColor("RED")
    .setDescription("봇이 해당 명령어를 수행할 권한이 부족해요, 권한을 다시 확인해주세요!")
    .setFooter("권한 부족")
    await channel.send(embed)
}