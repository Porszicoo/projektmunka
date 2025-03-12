const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'TrendTeesShop12@gmail.com', // Replace with your actual email address
        pass: 'vuyf kjnc rfrt xvro' // Replace with your generated app password
    }
});



// Function to send confirmation email
async function sendConfirmationEmail(to, orderDetails) {
    const mailOptions = {
        from: 'TrendTeesShop12@gmail.com', // Replace with your actual email address
        to: to,
        subject: 'Rendelés megerősítése',
        text: `Köszönjük a vásárlásod:\n\n${orderDetails}\n\nHa bármilyen kérdésed van, ne habozz kapcsolatba lépni velünk!`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('A megersőítő email elküldve');
    } catch (error) {
        console.error('Error sending email:', error.message);
        console.error('Full error details:', error);
    }
}

module.exports = {
    sendConfirmationEmail
};
