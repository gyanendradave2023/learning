// const jwt = require('jsonwebtoken');
// const User = require('./models/User');

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization || '';

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id);
//     } catch (err) {
//       console.error('Invalid token', err);
//     }
//   }
//   next();
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const User = require('./models/User');

const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : '';

  if (token) {
    try {
      // Verify token and decode it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user by ID from the token
      req.user = await User.findById(decoded.id);

      // If user not found, respond with error
      // if (!req.user) {
      //   return res.status(401).json({ message: 'User not found' });
      // }
    } catch (err) {
      req.user = null;
      console.error('Invalid token', err);
      //return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    req.user = null;
    console.error('No token found');
    // If no token provided, respond with error
    //return res.status(401).json({ message: 'No token provided' });
  }

  // Proceed to next middleware or route handler
  next();
};

module.exports = authMiddleware;
// Compare this snippet from frontend-client/src/features/email/emailSlice.js: