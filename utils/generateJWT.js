import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    console.log(process.env.BACKEND_JWT_SECRET);
    console.log(userId);
    const token = jwt.sign({ userId }, process.env.BACKEND_JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
}

export default generateToken;