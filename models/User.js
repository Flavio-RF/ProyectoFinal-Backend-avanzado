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
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
            required: [true, "Email required"]
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
    },
    {
        timestamps: true,
    }
);

//////hasheamos las password antes de guardar//////
userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        this.passowrd = await bcrypt.hash(this.password, 10);
    }
    return next();
});

//////agregamos un metodo para comparar contraseñas//////
userSchema.methods.comparePassword = async function (candidatePassword) {
    const match = await bcrypt.compare(candidatePassword, this.passowrd);
    return match;
};

//// toJSON es un metodo que se ejecuta antes de devolver un objeto al cliente, como un ".lean" de mongoose.
// cuando se devuelve un objeto al cliente, se le quita el campo password.
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.passowrd;
    return user;
};

userSchema.plugin(beautifyUnique);

const User = model("User", userSchema);

module.exports = User;

