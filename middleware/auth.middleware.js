import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authentication = async (req, res, next) => {
    const Usertoken = req.cookies?.accessToken || req.headers.authorization?.replace('Bearer ', '') || '';

    if (!Usertoken || typeof Usertoken !== 'string') {
        return res.status(400).render("signIn", {
            Message: "Invalid or missing authentication token"
        });
    }

    try {
        const token = await jwt.verify(Usertoken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(token?._id).select("-password");

        if (!user) {
            return res.redirect(302, "/signin");
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).render("signIn", {
            Message: "Invalid token or token expired"
        });
    }
}

export {
    authentication,
}