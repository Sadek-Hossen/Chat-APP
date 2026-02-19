import jwt from "jsonwebtoken";
const jwtToken = (userId,res)=>{
const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
     expiresIn: "1h" });
     res.cookie("jwt", token, {
        httpOnly: true,
       secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
}

export default jwtToken;