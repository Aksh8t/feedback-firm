import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    _id: string;
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified : boolean;
    isAcceptingMessages: boolean;
    messages : Message[];

}

const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: [true, "Username Is Required"], unique: true, trim: true },
    email: { type: String, required: [true, "Email Is Required"], unique: true, match: [/\S+@\S+\.\S+/, 'Email found invalid'], lowercase: true, trim: true },
    password: { type: String, required: [true, "Write a valid pass"] },
    verifyCode: { type: String, required: [true, "Verification Code Required"] },
    verifyCodeExpiry: { type: Date, required:  [true, "VerificationExpiry Code Required"] },
    isVerified: { type: Boolean, default: false },
    isAcceptingMessages: { type: Boolean, default: true },
    messages: { type: [MessageSchema], default: [] }
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model("User", UserSchema)
 
export default UserModel;