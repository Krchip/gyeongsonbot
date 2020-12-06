function sendMessage(client, message, text, type) {
    let content
    if (type === "black") {
        content = `
\`\`\`
Process Denied Command: ${text}
Author: ${message.author.username}#${message.author.discriminator} ( ID: ${message.author.id} )
Guild: ${message.guild.name} ( ID: ${message.guild.id} )
\`\`\`
            `
    } else {
        content = `
\`\`\`
Processed Command: ${text}
Author: ${message.author.username}#${message.author.discriminator} ( ID: ${message.author.id} )
Guild: ${message.guild.name} ( ID: ${message.guild.id} )
\`\`\`
            `
    }
    client.channels.cache.get("778582188676743209").send(content)
}

module.exports.sendMessage = sendMessage
