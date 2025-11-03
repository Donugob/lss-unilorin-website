const express = require('express');
const router = express.Router();
const {
    getMaterials,
    getAllMaterialsAdmin,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial
} = require('../controllers/materialController');
const { protect } = require('../middleware/authMiddleware');

// --- Public Route ---
// Handles public filtering, e.g., GET /api/materials?level=200L
router.get('/', getMaterials);

// --- Admin-Only "Get All" Route ---
// Must be before the dynamic '/:id' route
router.get('/all', protect, getAllMaterialsAdmin);

// --- Combined Admin/Public CRUD Routes for a single item ---
router.route('/:id')
    .get(getMaterialById) // Can be public if needed, but we'll use it for admin editing
    .put(protect, updateMaterial)
    .delete(protect, deleteMaterial);

// --- Admin-Only "Create" Route ---
router.post('/', protect, createMaterial);

module.exports = router;