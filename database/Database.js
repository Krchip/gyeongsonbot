const database = {
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "chip10290#",
        database: "gyeongson",
    },
}

module.exports = require("knex")(database)
