'use strict';

const nodemailer = require('nodemailer');

async function errorReport() {

    const testAccount = await nodemailer.createTestAccount();

    const config = {
        mailserver: {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        },
        mail: {
            from: 'Wevewations UwU',
            to: 'joe@joefarrell.dev',
            subject: 'AWERT: oopsie-woopsie!',
            text: ''
        }
    }

    const sendMail = async({mailserver, mail}) => {
        let transporter = nodemailer.createTransport(mailserver);
        const info = await transporter.sendMail(mail);
        
        console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
    }

    sendMail(config).catch(console.error);
}

module.exports.errorReport = errorReport;
