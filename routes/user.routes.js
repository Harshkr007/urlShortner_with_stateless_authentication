import express from "express";
import { handleCreateUser, handleSignInUser } from "../controllers/user.controller.js";

const router = express.Router(); // Call the Router function

router.post('/',handleCreateUser);

router.post('/signin', handleSignInUser);  // Corrected spelling to 'signin'
export default router;