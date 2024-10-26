import createTokenAndSaveCookie from "../jwt/generateToken.js";
import User from "../models/user.Model.js"
import  bcrypt from   'bcryptjs';
export const signup =async(req,res)=>{

try{
const {fullname,email,password,confirmPassword}=req.body;
if(password!==confirmPassword){
 return  res.status(500).json({error:" password doesn't match"});
}

let user=await User.findOne({email});
if(user){
    return res.status(500).json({error:"User already exist "});
}
    const hashPassword = await bcrypt.hash(password, 10);
    let newUser= new User( {
        fullname,
        email,
        password:hashPassword 
    });
console.log(newUser);
await newUser.save();
if (newUser) {
    createTokenAndSaveCookie(newUser._id, res);
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  }

}
catch(error){
  console.log(error);
  res.status(500).json({ error: "Internal server error" });
}
}




export const login =async(req,res)=>{
try{
    const {email,password}=req.body;

    
 const user=await User.findOne({email});
  
    let isMatch=await bcrypt.compare(password, user.password);

if(!user || !isMatch){
    return   res.status(500).json({ error: " Invaid Credentials " });
}
createTokenAndSaveCookie(user._id, res);

res.status(201).json({
  message: "User logged in successfully",
  user: {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
//   },
}})

} catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }

}


export const logout=async(req,res)=>{
    try {
        res.clearCookie("jwt"); //removes jwt token
        res.status(201).json({ message: "User logged out successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
}

// export const allUsers=async(req,res)=>{
//   try{
//   const loggedInUser=req.user._id;
// const filteredUsers=User.find({
//   _id:{  $ne:loggedInUser},
// })
// res.status(201).json(filteredUsers);
// }catch(error){
//   console.log(error)
  
// }
// }


export const allUsers = async (req, res) => {
  try {
    let user=req.user;
    const loggedInUser = req.user._id;// user ko humne req object me secureRoute eale middleware me save karaya tha user name se  
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
    
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};
