import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        require:true,
    },
    email : {
        type : String,
        require: true,
        unique: true
    },
    password : {
        type : String,
        require: true,
    }
},{timestamps: true})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }

});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.genrateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

export const User = mongoose.model("user", userSchema);