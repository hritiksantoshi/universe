import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
    {
        name: { type: String, required: false },
        categoryIcon: { type: String, required: false}
    }, { timestamps: true, versionKey: false }
)
export default model('category', CategorySchema);