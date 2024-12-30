const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const authenticateToken = require('../middleware/auth');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/shopping-list', authenticateToken, async (req, res) => {
    try {
        console.log('Received email request');
        const { email, htmlContent } = req.body;

        if (!email) {
            throw new Error('Email address is required');
        }

        const msg = {
            to: email,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: 'Your Shopping List',
            html: htmlContent
        };

        console.log('Attempting to send email to:', email);
        await sgMail.send(msg);
        console.log('Email sent successfully');

        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Server error sending email:', error);
        res.status(500).json({ 
            message: 'Failed to send email',
            error: error.message 
        });
    }
});

module.exports = router;