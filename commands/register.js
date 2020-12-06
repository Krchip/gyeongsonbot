const Discord = require("discord.js")
const ApplyMsg = "동의합니다."

module.exports = {
    name: "가입",
    description: "가입 커맨드",
    async excute(_client, message, _args, embed, knex) {
        let data = await knex("users").select("*").where({ id: message.author.id })
        if (data.length === 0) {
            let filter = (msg) => msg.content === ApplyMsg && msg.author.id === message.author.id
            embed.setDescription("경손 봇을 사용하실려면 약관에 동의하셔야 합니다. \n동의하신다면 채팅에 `동의합니다.` 를 입력해주세요.")
            await message.channel.send({ embed: registerEmbed })
            message.channel
                .awaitMessages(filter, { max: 1, time: 10000, errors: ["time"] })
                .then(async (collected) => {
                    if (!collected) {
                        message.reply("시간이 초과되어 취소되었습니다.")
                    }

                    await knex.insert({ id: message.author.id }).from("users")
                    return message.reply("가입 되었습니다.")
                })
                .catch(async (collected) => {
                    console.log(collected)
                    await message.reply("시간이 초과되어 취소되었습니다.")
                })
        } else {
            message.reply("이미 가입된 유저입니다.")
        }
    },
}
