const Discord = require("discord.js")
const intent_list = new Discord.Intents(["GUILD_MEMBERS", "GUILD_MESSAGES", "GUILDS"])
const client = new Discord.Client({ ws: { intents: intent_list } })
const fs = require("fs")
const { PREFIX, BOT_TOKEN } = require("./config.json")
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"))
const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"))
const knex = require("./database/Database")

client.commands = new Discord.Collection()

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    let eventName = file.split(".")[0]
    client.on(eventName, event.bind(null, client))
}

client.on("message", async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return

    const args = message.content.slice(PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    const embed = require("./tools/embed")(client, message)

    if (!client.commands.has(command)) return
    if (message.content.startsWith(PREFIX)) {
        try {
            let blacked = await knex("blacks").select("*").where({ id: message.author.id })
            console.log(blacked.length)
            if (blacked.length === 0) {
                require("./tools/functions").sendMessage(client, message, message.content, "default")

                let data = await knex("users").select("*").where({ id: message.author.id })
                if (data.length === 0) client.commands.get("가입").excute(client, message, args, embed, knex)
                else client.commands.get(command).excute(client, message, args, embed, knex)
            } else {
                require("./tools/functions").sendMessage(client, message, message.content, "black")
                embed.setDescription(`
당신은 봇 사용이 제한되었습니다.

차단한 관리자: ${blacked[0].admin}
차단 시각: ${blacked[0].time}
차산 사유: ${blacked[0].reason}
                `)
                message.reply(embed)
            }
        } catch {
            console.error(error)
        }
    }
})

client.login(BOT_TOKEN)
