const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// @desc    Send an email from the contact form
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    // 1. Basic server-side validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    // 2. Set up the Nodemailer transporter using your Gmail credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // 3. Define the email options
    const mailOptions = {
        from: `"${name}" <${email}>`, // Shows the sender's name and email
        to: process.env.EMAIL_USER,    // The email address that receives the message (your LSS email)
        subject: `New Message from LSS Website Contact Form - ${name}`,
        html: `
            <h3>You have a new contact request</h3>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
            </ul>
            <h3>Message:</h3>
            <p>${message}</p>
        `,
    };

    // 4. Try to send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
});

module.exports = router;