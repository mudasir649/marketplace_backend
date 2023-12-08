async function generateRandomString(){
    const characters = '0123456789';
    let randomCode = '';
    for (let i = 0; i <= 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters.charAt(randomIndex);
    }
    return randomCode;
}

export default generateRandomString;
