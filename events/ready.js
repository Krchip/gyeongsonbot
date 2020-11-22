module.exports = async (client) => {
    console.log(`${client.user.username} IS READY!`);

    function randomStatus() {
        let status = ["경손아 도움", `${client.users.cache.size} 명의 유저`];
        let restatus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[restatus], { type: "WATCHING" });
    }
    setInterval(randomStatus, 30000);
};
