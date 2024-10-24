import express from "express";
import { handleCreateUser, handleSignInUser,handleSignOutUser } from "../controllers/user.controller.js";

const router = express.Router(); 

router.post('/',handleCreateUser);

router.post('/signin', handleSignInUser);  

router.post('/signout', handleSignOutUser); 

export default router;