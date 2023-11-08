import nodemailer from "nodemailer";

export async function sendEmailReset(email, subject, code) {
    
    const transport = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
            user: 'eidcarosse@gmail.com',
            pass: '5631UJt8ZbXL4VIa'
        }
    })

    const mailOptions = {
        from: 'eidcarosse@gmail.com',
        to: email,
        subject,
        text: `Copy the password to reset password: ${code}`,
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: " + error);
        } else {
            console.log("Email sent: " + info.response);
        }    
})

}
