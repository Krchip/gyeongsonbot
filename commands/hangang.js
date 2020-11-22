const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "한강",
    description: "한강물 온도 커맨드",
    excute(_, message) {
        fetch("http://hangang.dkserver.wo.tc/")
            .then((res) => res.json())
            .then((json) => {
                if (json.result) {
                    if (json["temp"] > 15) {
                        let embed = new Discord.MessageEmbed();
                        embed.setTitle("현재 한강물 온도에요!");
                        embed.setDescription(`현재 한강물의 온도는, \`${json["temp"]}도\` 에요!`);
                        embed.addField("측정시각", `${json["time"].split(" ")[0]}`);
                        embed.setFooter("한강 수온은 따뜻한 편이네요.");
                        embed.setColor("#3396ff");
                        embed.setTimestamp();
                        message.channel.send(embed);
                    } else {
                        let embed = new Discord.MessageEmbed();
                        embed.setTitle("현재 한강물 온도에요!");
                        embed.setDescription(`현재 한강물의 온도는, \`${json["temp"]}도\` 에요!`);
                        embed.addField("측정시각", `${json["time"].split(" ")[0]}`);
                        embed.setFooter("한강 수온은 차가운 편이네요.");
                        embed.setColor("#3396ff");
                        embed.setTimestamp();
                        message.channel.send(embed);
                    }
                }
            });
    },
};
