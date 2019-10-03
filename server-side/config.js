const dotenv = require('dotenv');
dotenv.config()

const port = process.env.PORT
const connectionString = process.env.DATABASE_CONNECTION_STRING

module.exports = {
    port,
    connectionString
}