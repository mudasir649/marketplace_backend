import jwt from "jsonwebtoken";

const generateRandomToken = async () => {
    const characters = process.env.BACKEND_JWT_SECRET;
    let randomString = '';
    for (let i = 0; i <= 20; i++) {
        const string = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(string); 
    }
    return randomString;
}


const signedToken = async (userId, email, username) => {
    const generateRandom = await generateRandomToken(); 
    return jwt.sign({userId, email, username}, generateRandom, {
        expiresIn: '30d'
    });
}


const generateToken = async (userId, email, username, req, res) => {
    const token = await signedToken(userId, email, username);
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
    return token
}

export default generateToken;