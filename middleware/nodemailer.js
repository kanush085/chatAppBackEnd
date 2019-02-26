
const nodemailer = require('nodemailer');

exports.sendEMailFunction = (url) => {
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
           
            user: process.env.email,
            pass: process.env.password
        },
    });
    const mailOptions = {
        from: process.env.email,        
      
        to: process.env.email,   
    
        subject: 'node.js send mail',       
        
        text: ' verifaction link is:\n\n' + url
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log("error on sent mail" + err)
        else
            console.log("result sent on mail" + info);
    });
}