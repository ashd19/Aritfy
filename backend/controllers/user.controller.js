import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password){
            return res.status(404).json({message: "Enter both username and password", success: false})
        }

        const user = await User.findOne({username: username});
        if(user){
            return res.status(404).json({message: "User already exist with this name", success: false});
        }
        const hashedPass = await bcrypt.hash(password, 10);

        await User.create({
            username: username,
            password: hashedPass
        })

        return res.status(200).json({message: "User created Successfully", success: true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(404).json({message: "Enter both username and password", success: false})
        }
        let user = await User.findOne({username: username});
        if(!user){
            return res.status(404).json({message: "User not exist", success: false});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({message: "username or password is wrong", success: false});
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '4h'}
        );

        user = {
            _id: user._id,
            username: user.username
            //all needs here 🔴
        };

        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
        };

        return res.status(200).cookie("token", token, cookieOptions).json({
            message: `Welcome back ${username}!`,
            user,
            token,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error", error});
    }
}
