import { Schema, model, Document, Model } from "mongoose";
import bcrypt from 'bcryptjs';

// Interfaz para definir el tipo de un documento de usuario
interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    roles: Schema.Types.ObjectId[];
}

// Interfaz para definir el tipo de un modelo de usuario
interface UserModel extends Model<UserDocument> {
    encryptPassword(password: string): Promise<string>;
    comparePassword(password: string, receivedPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, UserModel>({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    roles: [{
        ref: "Roles",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async function(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async function(password: string, receivedPassword: string) {
    return await bcrypt.compare(password, receivedPassword);
};

const User = model<UserDocument, UserModel>('User', userSchema);

export default User;
