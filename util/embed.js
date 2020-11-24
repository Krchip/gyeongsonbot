const { MessageEmbed } = require("discord.js")

module.exports.denyofuse = async (message, permission) => {
    let embed = new MessageEmbed()
        .setDescription("사용자의 권한이 부족합니다.")
        .setColor("RED")
        .setFooter("요구 권한: " + permission)
    message.channel.send({ embed: embed })
}

module.exports.unexpectedError = async (message, error) => {
    let embed = new MessageEmbed()
        .setDescription("예기치 않은 오류가 발생했습니다.\n```\n" + error + "\n```")
        .setColor("RED")
        .setFooter("오류가 계속 발생한다면 아래 지원 서버로 문의해주세요.")
    message.channel.send("https://discord.gg/4uwv3UVEwv", { embed: embed })
}

module.exports.invaildCommand = async (message, command) => {
    let embed = new MessageEmbed().setDescription(`\`${command}\`가 올바른 명령어입니다.`).setColor("RED")
    message.channel.send({ embed: embed })
}

module.exports.forbidden = async (message) => {
    let embed = new MessageEmbed().setDescription("봇이 권한이 부족합니다.").setColor("RED")
    message.channel.send({ embed: embed })
}

module.exports.send = async (message, text) => {
    let embed = new MessageEmbed().setDescription(text).setColor("RED")
    message.channel.send({ embed: embed })
}
