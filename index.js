const Discord = require("discord.js")
const intent_list = new Discord.Intents(["GUILD_MEMBERS", "GUILD_MESSAGES", "GUILDS"])
const client = new Discord.Client({ ws: { intents: intent_list } })
const fs = require("fs")
const { PREFIX, BOT_TOKEN, TERMINAL } = require("./config.json")
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"))
const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"))

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

client.on("message", (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return

    const args = message.content.slice(PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if (!client.commands.has(command)) return
    try {
        client.commands.get(command).excute(client, message, args)
    } catch (error) {
        console.error(error)
    }
})

client.on("message", (message) => {
    if (message.author.bot || !message.guild) return

    if (message.content.startsWith(PREFIX)) {
        let embed = new Discord.MessageEmbed()
            .setTitle("명령어 사용 감지")
            .setDescription("명령어 사용이 감지되었어요.")
            .addField("사용된 명령어", `${message.content}`)
            .addField("명령어가 실행된 길드", `${message.guild.name}`)
            .addField("명령어가 실행된 채널", `${message.channel.name} | ${message.channel.id}`)
            .addField("사용한 유저", `${message.author.username} | ${message.author.id}`)
            .setColor("#4287f5")

        client.channels.cache.get(TERMINAL).send({ embed: embed })
    }
})

client.login(BOT_TOKEN)
