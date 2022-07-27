const mongoose = require("mongoose")
const seeders = require("./seeders")

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("Conectado a la base de datos")

        mongoose.connection.on("error", (error) => {
            console.log("Error mientras se tenía conexión con la base de datos.",
                error);
        });

        await seeders();

    } catch (error) {
        console.error("Error al iniciar conexión con la base de datos.", error);
    };
};