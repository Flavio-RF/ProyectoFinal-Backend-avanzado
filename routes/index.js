const authRoutes = require("./authRoutes")
const userRoutes = require("./userRoutes")



module.exports = (app) => {

    app.use(authRoutes);
    app.use(userRoutes);


}