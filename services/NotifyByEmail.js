const nodemailer = require('nodemailer');
const config = require("../config");
async function NotiifyByEmail(notifEmail,notifSubject,notifText){

    let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.getEmailCredentials().gmail,
                pass: config.getEmailCredentials().password
            },
            tls: {
                rejectUnauthorized: false
            }
            
        
    });

    let info = await transporter.sendMail({
        from: '"System@LirtenHub 👻" <agilePotatoesForLirten@gmail.com>',
        to: notifEmail,
        cc: ["agilePotatoesForLirten@gmail.com"],   //setting From and To with same value would cause erros
        subject: notifSubject + "✔",
        text: notifText
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = NotiifyByEmail;
