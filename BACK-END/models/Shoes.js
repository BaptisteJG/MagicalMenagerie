import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const shoesSchema = mongoose.Schema({
    nom: {type: String, require: true},
    prix: {type: Number, require: true},
    description: {type: String},
    image: {type: String},
    likes: {type: Number}
},
{
    timestamps: {createdAt: true}
});

shoesSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Shoes', shoesSchema);