import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['restaurant', 'hike', 'landmark', 'activity'],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
  timestamps: true
});
const Place = mongoose.model('Place', placeSchema);
export default Place;