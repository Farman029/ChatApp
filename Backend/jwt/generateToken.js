import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
 
  
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {// process.env.JWT_TOKEN is asecret key
    expiresIn: "10d",
  });
  // console.log(token);
  
  res.cookie("jwt", token, {
    httpOnly: true, // xss
    secure: true,
    sameSite: "strict", // csrf
  });
};
export default createTokenAndSaveCookie;

// res.cookie(name, value ,[ options])
// res.cookie('jwt', 'your-token', options) sets a cookie named jwt with the value 'your-token'.

// httpOnly: true makes the cookie inaccessible via JavaScript in the browser, enhancing security.

// secure: true ensures the cookie is sent only over HTTPS.

// maxAge: 3600000 sets the cookie to expire in 1 hour (3600000 milliseconds).