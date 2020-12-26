const database = {
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "password",
        database: "database",
    },
}

module.exports = require("knex")(database)
