const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const allUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const signup = async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
  
      // Check if any user exists
      const existingUsers = await User.find();
      let role = 'user';
  
      // If no user exists, make the first user an admin
      if (existingUsers.length === 0) {
        role = 'admin';
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, username, password: hashedPassword, role });
      await newUser.save();
  
      res.status(201).json({ user: newUser });
    } catch (error) {
      console.error('Error in signing up:', error);
      res.status(500).json({ error: 'Error in signing up' });
    }
};


const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            console.log('User not found for username:', username);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password for user:', username);
            return res.status(401).json({ error: 'Invalid password' });
        }

        // If username and password are valid, generate a JWT token
        console.log('Login successful. User ID:', user._id);
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '10hr' });
        console.log('SECRET_KEY:', process.env.SECRET_KEY);

        // Return the token along with user information in the response
        res.status(200).json({ message: "Login successful", user, token });
    } catch (e) {
        console.error('Error during login:', e);
        res.status(500).json({ error: 'Unable to process login' });
    }
};




const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.userId = decoded.userId;
        req.userRole = decoded.role; // Extract and set the user role
        next();
    });
};
   

module.exports = { allUser, signup, login, verifyToken,  };
