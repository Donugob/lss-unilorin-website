const Event = require('../models/eventModel');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({}).sort({ eventDate: -1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get the single featured event
// @route   GET /api/events/featured
// @access  Public
const getFeaturedEvent = async (req, res) => {
    try {
        const featuredEvent = await Event.findOne({ isFeatured: true });
        if (featuredEvent) {
            res.status(200).json(featuredEvent);
        } else {
            res.status(404).json({ message: 'No featured event found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- NEW FUNCTIONS START HERE ---

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
    try {
        const { title, description, eventDate, venue, isFeatured, imageUrl } = req.body;

        const event = new Event({
            title,
            description,
            eventDate,
            venue,
            isFeatured,
            imageUrl,
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        // --- NEW, MORE DETAILED ERROR HANDLING ---
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(400).json({ message: 'Failed to update event', error: error.message });
    }
};

// @desc    Get a single event by ID
// @route   GET /api/events/:id
// @access  Public (so we can link to a specific event page later)
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
    try {
        const { title, description, eventDate, venue, isFeatured, imageUrl } = req.body;
        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = title || event.title;
            event.description = description || event.description;
            event.eventDate = eventDate || event.eventDate;
            event.venue = venue || event.venue;
            // Use a direct check for boolean to allow setting it to 'false'
            event.isFeatured = isFeatured !== undefined ? isFeatured : event.isFeatured;
            event.imageUrl = imageUrl || event.imageUrl;

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        // --- NEW, MORE DETAILED ERROR HANDLING ---
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(400).json({ message: 'Failed to update event', error: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne(); // Mongoose v6+ uses deleteOne()
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


module.exports = {
    getEvents,
    getFeaturedEvent,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent,
};