const Material = require('../models/materialModel');

// @desc    Get materials with public filtering
// @route   GET /api/materials
// @access  Public
const getMaterials = async (req, res) => {
    try {
        const filter = {};
        if (req.query.level && req.query.level !== 'all') {
            filter.level = req.query.level;
        }
        if (req.query.materialType && req.query.materialType !== 'all') {
            filter.materialType = req.query.materialType;
        }

        const materials = await Material.find(filter).sort({ createdAt: -1 });
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- ADMIN CONTROLLERS ---

// @desc    Get ALL materials for the admin list
// @route   GET /api/materials/all
// @access  Private/Admin
const getAllMaterialsAdmin = async (req, res) => {
    try {
        const materials = await Material.find({}).sort({ createdAt: -1 });
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get a single material by ID for editing
// @route   GET /api/materials/:id
// @access  Private/Admin
const getMaterialById = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (material) {
            res.json(material);
        } else {
            res.status(404).json({ message: 'Material not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new material
// @route   POST /api/materials
// @access  Private/Admin
const createMaterial = async (req, res) => {
    try {
        const { title, description, level, materialType, fileUrl, fileType } = req.body;

        const material = new Material({
            title,
            description,
            level,
            materialType,
            fileUrl,
            fileType
        });

        const createdMaterial = await material.save();
        res.status(201).json(createdMaterial);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create material', error: error.message });
    }
};

// @desc    Update a material
// @route   PUT /api/materials/:id
// @access  Private/Admin
const updateMaterial = async (req, res) => {
    try {
        const { title, description, level, materialType, fileUrl, fileType } = req.body;
        const material = await Material.findById(req.params.id);

        if (material) {
            material.title = title || material.title;
            material.description = description || material.description;
            material.level = level || material.level;
            material.materialType = materialType || material.materialType;
            material.fileUrl = fileUrl || material.fileUrl;
            material.fileType = fileType || material.fileType;

            const updatedMaterial = await material.save();
            res.json(updatedMaterial);
        } else {
            res.status(404).json({ message: 'Material not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to update material', error: error.message });
    }
};

// @desc    Delete a material
// @route   DELETE /api/materials/:id
// @access  Private/Admin
const deleteMaterial = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);

        if (material) {
            await material.deleteOne();
            res.json({ message: 'Material removed' });
        } else {
            res.status(404).json({ message: 'Material not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    getMaterials,
    getAllMaterialsAdmin,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial,
};