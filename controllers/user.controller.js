import { User } from "../models/user.model.js";

const options = {
    httpOnly: true,
    secure: true,
}

const generateAccessToken = async (userId) => {
    const user = await User.findById(userId);

    const token = await user.genrateAccessToken();

    return token;
}

const handleCreateUser = async (req, res) => {
    const { userName, email, password } = req.body;

    const existUser = await User.findOne({
        email: email,
    });

    if (existUser) {
        return res.status(400).json({
            error: "User already exist"
        })
    }

    try {
        const newUser = await User.create({
            userName: userName,
            email: email,
            password: password,
        });
        res.status(201).render("signIn", {
            userId: newUser._id,
            Message: "User created successfully"
        });

    } catch (error) {
        console.log("Error in new user create :", error);
        res.status(500).render("signUp");
    }

}

const handleSignInUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).render("signIn", {
            Message: "please enter valid email and password",
        });
    }

   try {
     const userExist = await User.findOne({
         email: email,
     })
 
     if (!userExist) {
         return res.status(400).render("signIn", {
             Message: "User don't exist"
         });
     }
 
     const passwordCheck = await userExist.isPasswordCorrect(password);
 
     if (!passwordCheck) {
         return res.status(400).render("signIn", {
             Message: "Password is incorrect"
         });
     }
 
     const token = await generateAccessToken(userExist._id);
 
     return res.status(300)
         .cookie('accessToken',token,options)
         .redirect("/");
 
   } catch (error) {
        return res.status(400).render("signIn");
   }
}

const handleSignOutUser = async (req, res) => {

    res
    .status(200)
    .clearCookie('accessToken',options)
    .redirect("/");
}

    export {
        handleCreateUser,
        handleSignInUser,
        handleSignOutUser,
    }
