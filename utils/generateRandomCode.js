async function generateRandomString(){
    const characters = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NDU5MDQ5NiwiaWF0IjoxNjk0NTkwNDk2fQ.mlSNOw-jHUMWyyNTvC4dKI9hPPlZxnHBnxID_eU-U4k';
    let randomCode = '';
    for (let i = 0; i <= 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters.charAt(randomIndex);
    }
    return randomCode;
}

export default generateRandomString;
