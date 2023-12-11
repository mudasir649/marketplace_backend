import nodemailer from "nodemailer";
import path, { extname } from "path";
import hbs from 'nodemailer-express-handlebars';

export async function sendEmailReset(email, subject, text1, text2, code) {
    
    const transport = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
            user: 'eidcarosse@gmail.com',
            pass: '5631UJt8ZbXL4VIa'
        }
    })

    const handlebarOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve('./views'),
            defaultLayout: false
        },
        viewPath: path.resolve('./views'),
        extname: 'handlebars'
    }

    transport.use('compile', hbs(handlebarOptions))

    const mailOptions = {
        from: 'eidcarosse@gmail.com',
        to: email,
        subject,
        template: 'email',
        context: {
            text1: text1,
            text2: text2,
            code: code
        }
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: " + error);
        } else {
            console.log("Email sent: " + info.response);
        }    
})

}
