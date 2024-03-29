import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false 
});

export default model('Task', taskSchema);
