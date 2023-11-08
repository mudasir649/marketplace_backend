import Sib from "sib-api-v3-sdk";

async function userEmail(subject, message, image, email, fullName, make, model, year, description, phoneNo){

    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = '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';

    const transEmail = new Sib.TransactionalEmailsApi();
    let transportEmail;

    const sender = {
        email: 'eidcarosse@gmail.com',
        name:'Steven'
    }

    const receiver = [
        {
            email: 'eidcarosse@gmail.com'
        }
    ];

    if(image){
        let imgTag;
        if(typeof image == "object"){
            imgTag = image.map((image, i) => `<img src="${image}" alt="Image ${i + 1}">`).join('');
        }else{
            imgTag = `<img src="${image}" />`
        }
        try {
            if(fullName && make && model && year && description && phoneNo){
                transportEmail = await transEmail.sendTransacEmail({
                    sender,
                    to: receiver,
                    subject: 'Test email',
                    textContent: 'This is the body of the message.',
                    htmlContent: `<h1>Contact Us.</h1>
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
                    `,
                    params: {
                        role: 'Frontend'
                    }
                })
            }else{
                transportEmail = await transEmail.sendTransacEmail({
                    sender,
                    to: receiver,
                    subject: subject,
                    textContent: 'This is the body of the message.',
                    htmlContent: `<h1>Contact Us.</h1>
                    <p>${message}</p>
                    <h2>email sent by ${email}</h2>
                    `,
                    params: {
                        role:'Frontend'
                    }
                })
            }
    
            const result = transportEmail;  
            return result;
    
        } catch (error) {
            console.log(error);
        }    
    }else{
        transportEmail = await transEmail.sendTransacEmail({
            sender,
            to: receiver,
            subject: subject,
            textContent: 'This is the body of the message.',
            htmlContent: `<h1>Contact Us.</h1>
            <p>${message}</p>
            <h2>email sent by ${email}</h2>
            `,
            params: {
                role: 'Frontend'
            }
        });

        console.log(transportEmail);

        const result = transportEmail;

        console.log(result);

        return result;
        try {
            transportEmail = await transEmail.sendTransacEmail({
                sender,
                to: receiver,
                subject: subject,
                textContent: 'This is the body of the message.',
                htmlContent: `<h1>Contact Us.</h1>
                <p>${message}</p>
                <h2>email sent by ${email}</h2>
                `,
                params: {
                    role: 'Frontend'
                }
            })
    
            const result = transportEmail;
    
            return result;
    
        } catch (error) {
            console.log(error);
        }
    
    }
};

export default userEmail;