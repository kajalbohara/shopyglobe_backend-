import express from "express"
import { loginUser, registerUser } from "../controllers/userControllers.js";
// import { checkAuth } from "../utils/checkAuth.js";

const router = express();


router.post("/loginUser", loginUser);
router.post("/registerUser", registerUser);


export default router;



