const Executive = require('../models/executiveModel');

// @desc    Get all executives
// @route   GET /api/executives
// @access  Public
const getExecutives = async (req, res) => {
    try {
        const executives = await Executive.find({}).sort({ displayOrder: 'asc' });
        res.status(200).json(executives);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get a single executive by ID
// @route   GET /api/executives/:id
// @access  Public
const getExecutiveById = async (req, res) => {
    try {
        const executive = await Executive.findById(req.params.id);
        if (executive) {
            res.json(executive);
        } else {
            res.status(404).json({ message: 'Executive not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get ALL featured executives
// @route   GET /api/executives/featured
// @access  Public
const getFeaturedExecutive = async (req, res) => {
    try {
        const featuredExecutives = await Executive.find({ isFeatured: true }).sort({ displayOrder: 'asc' });
        res.json(featuredExecutives);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- ADMIN CONTROLLERS ---

// @desc    Create a new executive
// @route   POST /api/executives
// @access  Private/Admin
const createExecutive = async (req, res) => {
    try {
        const executive = await Executive.create(req.body);
        res.status(201).json(executive);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create executive profile', error: error.message });
    }
};

// @desc    Update an executive
// @route   PUT /api/executives/:id
// @access  Private/Admin
const updateExecutive = async (req, res) => {
    try {
        const executive = await Executive.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!executive) {
            return res.status(404).json({ message: 'Executive not found' });
        }
        res.json(executive);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update executive profile', error: error.message });
    }
};

// @desc    Delete an executive
// @route   DELETE /api/executives/:id
// @access  Private/Admin
const deleteExecutive = async (req, res) => {
    try {
        const executive = await Executive.findById(req.params.id);
        if (executive) {
            await executive.deleteOne();
            res.json({ message: 'Executive profile removed' });
        } else {
            res.status(404).json({ message: 'Executive not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getExecutives,
    getExecutiveById, // Ensure this is exported
    getFeaturedExecutive,
    createExecutive,
    updateExecutive,
    deleteExecutive
};