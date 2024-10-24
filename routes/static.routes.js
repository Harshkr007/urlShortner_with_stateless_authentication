import { Router } from "express";
import { authentication } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/",authentication, (req, res) => {
  return res.render("Home", {});
});

router.get("/signup", (req,res) => {
    return res.render("signUp");
})

router.get("/signin", (req,res) => {
    return res.render("signIn");
})

export default router;
