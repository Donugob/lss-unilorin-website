const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // --- 1. IMPORT THE PATH MODULE ---
const connectDB = require('../config/db');

// Load Models
const Event = require('../models/eventModel');
const Executive = require('../models/executiveModel');

// --- 2. CONFIGURE DOTENV WITH A RELIABLE PATH ---
// This creates a correct path to the .env file which is one directory up from this file.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to DB
connectDB();


// Add this array at the top
const executives = [
    { name: 'Jane Doe', position: 'President', imageUrl: 'https://via.placeholder.com/300', displayOrder: 1 },
    { name: 'John Smith', position: 'Vice President', imageUrl: 'https://via.placeholder.com/300', displayOrder: 2 },
    { name: 'Emily White', position: 'General Secretary', imageUrl: 'https://via.placeholder.com/300', displayOrder: 3 },
];

const events = [
    {
        title: "Annual Law Symposium",
        description: "A flagship event featuring keynote speakers from the judiciary.",
        eventDate: new Date("2025-11-28T10:00:00.000Z"),
        venue: "Faculty of Law Auditorium",
        isFeatured: true
    },
    {
        title: "Moot Court Competition Finals",
        description: "Witness the final round of our prestigious moot court competition.",
        eventDate: new Date("2025-10-15T14:00:00.000Z"),
        venue: "Moot Court Room",
        isFeatured: false
    }
];

// Function to import data into DB
const importData = async () => {
    try {
        await Event.deleteMany();
        await Executive.deleteMany();
        await Event.insertMany(events);
        await Executive.insertMany(executives);
        console.log('Data Imported! ✅');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message} ❌`);
        process.exit(1);
    }
};

// Function to destroy data
const destroyData = async () => {
    try {
        await Event.deleteMany();
        console.log('Data Destroyed! 🗑️');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message} ❌`);
        process.exit(1);
    }
};

// Check for command line arguments
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}