// import JWT from "jsonwebtoken";

// const JWTSECRET = "mykey"; // Replace with your actual secret key

// export const checkAuth = (req, res, next) => {
//   const token = req.headers.authtoken;
//   console.log("Token received:", token); // Add this to debug
//   if (!token) {
//     return res.status(403).json({ success: false, message: "Auth token required" });
//   }

//   JWT.verify(token, JWTSECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ success: false, message: "Invalid token" });
//     }
//     req.user = decoded; // Attach user data to the request
//     next();
//   });
// };
// const jwt = require("jsonwebtoken");


import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token after "Bearer"
        if (!token) {
            return res.status(403).json({ success: false, message: "Auth token required" });
        }

        const decoded = jwt.verify(token, "mykey"); // Replace with env variable
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
