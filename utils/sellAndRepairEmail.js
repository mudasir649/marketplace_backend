import hbs from 'nodemailer-express-handlebars';
import nodemailer from "nodemailer";
import path from "path";

export async function sellAndRepairEmail(email, fullName, make, model, year, description, phoneNumber, subject, image){

    console.log("subject", subject);
    console.log(image[0]);
    console.log(image[1]);

    const transport = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
            user: 'eidcarosse@gmail.com',
            pass: '5631UJt8ZbXL4VIa'
        }
    });

    const handlebarOptions = {
        viewEngine: {
            extName: '.handlebars',
            defaultLayout: false
        },
        viewPath: path.resolve('./views'),
        extname: 'handlebars'
    }

    transport.use('compile', hbs(handlebarOptions));

    const templateData = {
        email,
        fullName,
        make,
        model,
        year,
        description,
        phoneNumber,
        image
    };

    const mailOptions = {
        from: 'eidcarosse@gmail.com',
        to: 'eidcarosse@gmail.com',
        subject: subject,
        template: 'sellrepair',
        context: templateData
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending email: " + err);
        } else {
            console.log("Email sent: " + info.response);
        }  
    })

}