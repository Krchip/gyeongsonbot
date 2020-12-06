module.exports = {
    name: "핑",
    description: "핑 커맨드",
    excute(client, message, _args, embed, knex) {
        const time = new Date()
        message.channel.send("측정 중입니다..").then(async (msg) => {
            await knex("users")
                .select("*")
                .limit(1)
                .then(() => {
                    embed.setDescription(
                        `
현재 봇의 핑\n
메시지 지연시간: \`${msg.createdTimestamp - message.createdTimestamp}ms\`
Discord API: \`${Math.round(client.ws.ping)}ms\`
MySQL: \`${new Date() - time}ms\``
                    )
                })
            msg.edit({ content: "현재 봇의 핑입니다!", embed })
        })
    },
}
