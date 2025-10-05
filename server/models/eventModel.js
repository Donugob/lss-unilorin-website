const mongoose = require('mongoose');

// This is the schema that defines the structure of our event documents
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'], // You can add custom error messages
        trim: true // Removes whitespace from the beginning and end
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    eventDate: {
        type: Date,
        required: [true, 'Please set a date for the event']
    },
    venue: {
        type: String,
        required: [true, 'Please add a venue']
    },
    imageUrl: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1625141071/placeholder.jpg' // A generic placeholder
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    // This option automatically adds `createdAt` and `updatedAt` fields
    timestamps: true
});

// Create the model from the schema and export it
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;