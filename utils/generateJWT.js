import jwt from "jsonwebtoken";


const signedToken = async (userId, email, username) => {
    return jwt.sign({userId, email, username}, process.env.BACKEND_JWT_SECRET, {
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