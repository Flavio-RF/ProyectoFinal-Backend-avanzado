const { Schema, model } = require("mongoose")
const beautifyUnique = require("mongoose-beautiful-unique-validation")
const bcrypt = require("bcryptjs")

const userSchema = new Schema(
    {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,

        },
        password: {
            type: String,
            required: true,
            minLenght: 6,
            maxLenght: 30,
        },
        tweet: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tweet",
            },
        ],
    },
    {
        timestamps: true,
    }
);

//////hasheamos las password antes de guardar//////
userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
});



//////agregamos un metodo para comparar contraseñas//////
userSchema.methods.comparePassword = async function (candidatePassword) {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
};

//// toJSON es un metodo que se ejecuta antes de devolver un objeto al cliente, como un ".lean" de mongoose.
// cuando se devuelve un objeto al cliente, se le quita el campo password.
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

userSchema.plugin(beautifyUnique);

const User = model("User", userSchema);

module.exports = User;

