const User = require("../models/User")


module.exports = async () => {

    User.syncIndexes();
    await User.create({
        email: "maria.perez@gmail.com",
        username: "Maria",
        password: "123456",
    });
    console.log(`Se guardaron los usuarios de prueba en la base de datos`);
};