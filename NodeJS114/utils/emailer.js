require('dotenv').config();
const nodemailer = require('nodemailer');

//send email using sendinblue

module.exports = async (mailOptions) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'SendinBlue', //listed in nodemailer well-known services, no need to set host or port
            auth: {
                user: mailOptions.user,
                pass: mailOptions.pass
            }
        });
    
        await transporter.sendMail({
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject,
            text: mailOptions.text
        });
    
        console.log('Email sent.');
    } catch (err) {
        console.error(err);
    }
}
