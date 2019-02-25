const nodemailer = require('nodemailer')

exports.sendMailFunction = (url) => {

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password

        },
    });
    const mailOptions = {
        from: process.env.email,
        to: process.env.email,
        subject: 'send mail node.js',
        text: 'verification link\n' + url
    };


    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("error in sent mail" + err);

        }
        else {
            console.log("mail sent successfully" + info);

        }
    });



}