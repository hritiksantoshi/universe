import { Schema, model } from 'mongoose';

const CollectionSchema = new Schema(
    {
        name: { type: String, required: false },
        royalties: { type: String, required: false },
        description: { type: String, required: false },
        logoImg: { type: String, required: false},
        bannerImg:{type: String, required: false}
    }, { timestamps: true, versionKey: false }
)
export default model('collection', CollectionSchema);