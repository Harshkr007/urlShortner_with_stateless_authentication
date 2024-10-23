import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/user.model.js";
import { setUser } from '../service/auth.service.js';

const handleCreateUser = async (req,res) => {
    const {userName,email,password} = req.body;

    const existUser = await User.findOne({
        email : email,
    });

    if(existUser){
        return res.status(400).json({
            error : "User already exist"
        })
    }

    try {
        const newUser = await User.create({
            userName : userName,
            email : email,
            password : password,
        });
        res.status(201).render("signIn", {
            userId : newUser._id,
            Message: "User created successfully"
          });

    } catch (error) {
        console.log("Error in new user create :",error);
        res.status(500).render("signUp");
    }

}

const handleSignInUser = async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).render("signIn", {
            Message: "please enter valid email and password",
          });
    }

    const userExist = await User.findOne({
        email : email,
        password :password,
    })

    if (!userExist){
        res.status(400).render("signIn", {
            Message: "User don't exist"
          });
    }

    const sessionId = uuidv4();
    setUser(sessionId,userExist);
    res.cookie('uid',sessionId);

    res.status(300).redirect("/");
}

export {
    handleCreateUser,
    handleSignInUser,
}
