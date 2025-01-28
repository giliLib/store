import{Router} from "express";

import{addUser_signUp,getUserById,getAllUsers,updateUser,updateUserPassword,login}from "../Controllers/user.js"

const router=Router();
router.post("/signup",addUser_signUp);
router.get("/:id",getUserById);
router.get("/",getAllUsers);
router.put("/:id",updateUser);
router.put("/:id/password",updateUserPassword);
router.post("/login",login);

export default router;
