"--unhandled-rejections=strict"

const koreanbots = require("koreanbots")
const Bot = new koreanbots.MyBot(require("../config.json").KOREANBOTS_TOKEN)
let update = (count) => Bot.update(count)
let latency = 10800000

module.exports = async (client) => {
    console.log(`${client.user.username} IS READY!`)

    /*
    update(client.guilds.cache.size).catch(() => {
        return
    })
    */

    setInterval(function () {
        update(client.guilds.cache.size)
    }, latency)

    function randomStatus() {
        let status = ["경손아 도움", `${client.users.cache.size} 명의 유저`]
        let restatus = Math.floor(Math.random() * status.length)
        client.user.setActivity(status[restatus], { type: "WATCHING" })
    }
    setInterval(randomStatus, 30000)
}
