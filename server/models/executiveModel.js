const mongoose = require('mongoose');

const executiveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    imageUrl: { type: String, required: true },
    displayOrder: { type: Number, default: 0 }, // To control the order they appear
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

const Executive = mongoose.model('Executive', executiveSchema);
module.exports = Executive;