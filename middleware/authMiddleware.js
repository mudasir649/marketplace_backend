import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { validationResult, body } from "express-validator";



const validateRegister = async(req, res, next) => {
  const userValidationRules = [
    body('firstName').isString(),
    body('lastName').isString(),
    body('userName').isString(),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 8 }), // Require a minimum length of 8 characters
    body('phoneNumber').isMobilePhone('any', { strictMode: false }), // Validate as a phone number in any format
    // Add more validation rules as needed
  ];

  // Run the validation rules on the request body
  Promise.all(userValidationRules.map((validationRule) => validationRule.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    });
}

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

export { protect, validateRegister };