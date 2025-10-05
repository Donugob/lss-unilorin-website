const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please add a full name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [ // Regex to ensure it's a valid email format
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // This will prevent the password from being sent back in queries by default
    },
    role: {
        type: String,
        enum: ['editor', 'admin'], // Define the possible roles
        default: 'editor'
    }
}, {
    timestamps: true
});

// --- Middleware to Hash Password BEFORE saving ---
// This 'pre-save' hook will run automatically before a new user document is saved.
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        next();
    }

    // Generate a 'salt' to make the hash more secure
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
});

// --- Method to Compare Passwords ---
// We are adding a custom method to our user model to compare the entered password with the hashed one.
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;