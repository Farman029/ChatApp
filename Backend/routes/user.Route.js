import express from "express"
import { allUsers, login, logout, signup } from "../controller/user.Controller.js";
import secureRoute from "../middleware/secureRoute.js"
const router=express.Router();

router.get("/test",(req,res)=>{
    res.send(" you are on user route");
})

router.post("/signup",signup);

router.post("/login",login);
router.post("/logout",logout)
router.get("/allusers",secureRoute,allUsers);



export default router;