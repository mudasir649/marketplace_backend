import nodemailer from "nodemailer";

const CLIENT_ID=process.env.BACKEND_GMAIL_CLIENT_SECRET;
const CLIENT_SECRET=process.env.BACKEND_GMAIL_CLIENT_ID;

async function userEmail(subject, message, image, email, fullName, make, model, year, description, phoneNo){

    if(image){
        let imgTag;
        let mailOptions;
        if(typeof image == "object"){
            imgTag = image.map((image, i) => `<img src="${image}" alt="Image ${i + 1}">`).join('');
        }else{
            imgTag = `<img src="${image}" />`
        }
        try {
            const transport = nodemailer.createTransport({
                service:'gmail',
                secure: false,
                auth: {
                    type:'OAUTH2',
                    user:'mudasirriaz649@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    accessToken:'ya29.a0AfB_byDRp6XjRCnT-io1TcKWCi8aDUldLTQSNNmzGvMRwPKK82c04-oK9Y-tDGPEM--W4mtB2IKKK6eRwKzbkyLxVMbsjiXlqGXWNfhV4BAQVKBhQBqNi4FA7kPqnM7btaNbOtHSsOUtzRQYeu7cgyn1r8i02ovHh-vqaCgYKARwSARMSFQGOcNnCqxn_Nty8wD-LAVr3yksIzw0171'
                },
                tls: {
                    rejectUnauthorized: false
                  }
            });

            if(fullName && make && model && year && description && phoneNo){
                mailOptions = {
                    from: 'mudasirriaz649@gmail.com',
                    to: 'mudasirriaz649@gmail.com',
                    subject: subject,
                    text: 'This is the body of the message.',
                    html: `<h1>Contact Us.</h1>
                    <p>This email for sell now..</p>
                    <br/>
                    <h2>email sent by ${email}</h2>
                    <br/>
                    <h2>Full Name: ${fullName}</h2>
                    <br/>
                    <h2>Make: ${make}</h2>
                    <br/>
                    <h2>Model: ${model}</h2>
                    <br/>
                    <h2>Year: ${year}</h2>
                    <br/>
                    <h2>Description: ${description}</h2>
                    <br/>
                    <h2>Phone Number: ${phoneNo}</h2>
                    ${imgTag}
                    `
                }
            }else{
                mailOptions = {
                    from: 'mudasirriaz649@gmail.com',
                    to: 'mudasirriaz649@gmail.com',
                    subject: subject,
                    text: 'This is the body of the message.',
                    html: `<h1>Contact Us.</h1>
                    <p>${message}</p>
                    <h2>email sent by ${email}</h2>
                    ${imgTag}
                    `
                }
            }
    
            const result = await transport.sendMail(mailOptions);
    
            return result;
    
        } catch (error) {
            console.log(error);
        }    
    }else{
        try {
            const transport = nodemailer.createTransport({
                service:'gmail',
                secure: false,
                auth: {
                    type:'OAUTH2',
                    user:'mudasirriaz649@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    accessToken:'ya29.a0AfB_byBZVO6zKqAT2hBLfWB5BFi__P-8OcY3AWjLyZB9QN0heQX4mA1vXbPbNBGTLyHFcJY8Artu_Gs6u4YUt6GcPNz5KmGXkunnmKdvdD0ROyrPbLvd-BmAkvu9DftHzENVkcJFLQQPOZ83me8hk_2nb-5fHdpbwG6BaCgYKAVsSARMSFQGOcNnC8IL3c-Fk4WHGgc6_aJo_Cw0171'
                },
                tls: {
                    rejectUnauthorized: false
                  }
            });
        
            const mailOptions = {
                from: 'mudasirriaz649@gmail.com',
                to: 'mudasirriaz649@gmail.com',
                subject: subject,
                text: 'This is the body of the message.',
                html: `<h1>Contact Us.</h1>
                <p>${message}</p>
                <h2>email sent by ${email}</h2>
                `
            }
    
            const result = await transport.sendMail(mailOptions);
    
            return result;
    
        } catch (error) {
            console.log(error);
        }
    
    }
};

export default userEmail;