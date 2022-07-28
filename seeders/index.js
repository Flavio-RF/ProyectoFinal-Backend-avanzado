const mongoose = require("mongoose")
const userSeeder = require("./userSeeder")

module.exports = async () => {
    // Seeders:
    if (process.env.DEV) {
        await userSeeder();
        await mongoose.connection.dropDatabase()
    }


};
