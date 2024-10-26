import jwt from 'jsonwebtoken';
import User from "../models/user.Model.js"

// 

const secureRoute = async (req, res, next) => {
  try {
 
    
    const token = req.cookies.jwt; // cookie-parser must be installed to use req.cookies
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    // console.log(decoded);
    
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password"); // current loggedin user
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }
    req.user = user;  //req me user ko save kiya hia user name ke variable se 
    next();
  } catch (error) {
    console.log("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default secureRoute;
