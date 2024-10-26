import express from "express";

import secureRoute from "../middleware/secureRoute.js";
import { getMessage, sendMessage } from "../controller/message.Controller.js";

const router = express.Router();
router.post("/send/:id", secureRoute, sendMessage)
router.get("/get/:id", secureRoute, getMessage);
router.get("/test",(req,res)=>{
    res.send("hi Welcome to message Route");
})
export default router;
