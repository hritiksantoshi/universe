import { Schema, model } from 'mongoose';

const AdminSchema = new Schema(
    {
        email: { type: String, required: false },
        firstName: { type: String, required: false, minLength: 2 },
        lastName: { type: String, required: false},
        password: { type: String, minLength: 4, maxLength: 80 },
        isBlocked: { type: Boolean, default: false }
    }, { timestamps: true, versionKey: false }
)
export default model('admin', AdminSchema);