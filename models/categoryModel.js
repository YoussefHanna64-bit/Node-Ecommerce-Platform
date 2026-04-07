import mongoose from 'mongoose';

const { Schema } = mongoose

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [3, "Scheme must be at least 3 characters"]
    },
    description: {
        type: String,
        required: true,
        minlength: [3, "Scheme must be at least 3 characters"]
    },
})

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;