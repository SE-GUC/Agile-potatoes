const nodemailer = require('nodemailer');
const config = require("../config");
async function NotiifyByEmail(notifEmail,notifSubject,notifText){

    let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.getEmailCredentials().gmail,
                pass: config.getEmailCredentials().password
            }
        
    });

    let info = await transporter.sendMail({
        from: '"System@LirtenHub 👻" <islamsecourse@gmail.com>',
        to: notifEmail,
        subject: notifSubject + "✔",
        text: notifText
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = NotiifyByEmail;
