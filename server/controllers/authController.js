import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// sign up
export const registerUser = async (req, res) => {
    try {
        //get user data
        const { name, email, password } = req.body;
        //check if user exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: 'User already exists'});
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        // generate a JWT
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d'});
        // send the response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//login
export const login = async (req, res) => {
    try {
        //get user login data
        const { email, password } = req.body;
        //check if user exists
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ message: 'User doesnt exist' });
        }
        //check if data matches
        const isMatch = await bcrypt.compare(password, userExists.password);

        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials'});
        }

        // generate a JWT
        const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        // send the response
        res.status(200).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};