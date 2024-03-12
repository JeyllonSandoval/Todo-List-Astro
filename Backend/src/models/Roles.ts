import { Schema, model } from "mongoose";

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Roles', roleSchema);