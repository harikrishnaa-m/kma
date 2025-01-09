const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: Number },
    password: { type: String },
    
}, { timestamps: true })

const User = mongoose.model("User", UserSchema);

module.exports = User;