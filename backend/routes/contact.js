const express = require('express');
const router = express.Router();
const emailService = require('../utils/emailService');


router.post('/', (req, res) => {
    const { name, email, message, surname, phone } = req.body;

    
    const emailContent = `
        Name: ${name}
        Surname: ${surname}
        Phone: ${phone}
        Email: ${email}
        Message: ${message}
    `;

    
    emailService.sendEmail({
        to: 'trendteesshop12@gmail.com', 
        subject: 'Hibaával kapcsolatos üzenet',
        text: emailContent,
    })
    .then(() => {
        res.status(200).send('Email sent successfully');
    })
    .catch((error) => {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    });
});

module.exports = router;
