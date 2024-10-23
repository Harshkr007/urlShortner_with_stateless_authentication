import { getUser } from "../service/auth.service.js";

      //restrictToLoggedinuserOnly
      const authentication = async (req,res,next) => {
          const userUid = req.cookies?.uid;

          if(!userUid){
              // Correct way to handle the redirect
              return res.status(400).render("signIn", {
                  Message: "User don't have the cookie"
              });
              // Or if you want to use redirect:
              // return res.redirect(302, "/signin");
          }

          const user = getUser(userUid);

          if(!user){
              return res.redirect(302, "/signin");
          }

          req.user = user;
          next();
      }
export {
    authentication,
}