const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")
const error = require("../util/embed.js")

module.exports = {
    name: "코로나",
    description: "코로나 현황 커맨드",
    excute(_, message) {
        fetch("https://api.corona-19.kr/korea/?serviceKey=dd5b81feecaa4ab061ad260adb5ba4e3a")
            .then((res) => res.json())
            .then((json) => {
                if (json["resultMessage"] === "정상 처리되었습니다.") {
                    let embed = new MessageEmbed()
                        .setTitle("국내 코로나19 발생현황")
                        .setDescription("코로나19 바이러스 국내 현황입니다.")
                        .addField("누적 확진자", `${json["TotalCase"]}명`)
                        .addField("누적 완치자", `${json["TotalRecovered"]}명`)
                        .addField("누적 사망자", `${json["TotalDeath"]}명`)
                        .addField("현재 검사중", `${json["checkingCounter"]}명`)
                        .addField("금일 완치자", `${json["TodayRecovered"]}명`)
                        .addField("금일 사망자", `${json["TodayDeath"]}명`)
                        .addField("정보 업데이트", `${json["updateTime"]}`)
                        .setTimestamp()
                        .setFooter("코로나19 모두 함께 극복해요!")
                        .setColor("#e00707")
                    message.channel.send({ embed: embed })
                } else {
                    error.unexpectedError(message, "API에 요청을 보내지 못했습니다.")
                }
            })
    },
}
