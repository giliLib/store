import { productModel } from "../Model/product_resource.js";
import { userModel } from "../Model/user_resource.js";

export async function addUser_signUp(req, res) {
    let { body } = req;
    if (!body.userName || !body.password || !body.email) {
        return res.status(400).json({
            title: "Missing data in body",
            message: "userName, password, and email are required"
        });
    }
    try {
        let alreadyUser = await userModel.findOne({ userName: body.userName });
        if (alreadyUser) {
            return res.status(409).json({
                title: "User already exists",
                message: "Change user name"
            });
        }
        let newUser = new userModel(body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({
            title: "Cannot add new user",
            message: err.message
        });
    }
}

export async function getUserById(req, res) {
    let { id } = req.params;
    try {
        let getUserbyId = await userModel.findById(id);
        if (!getUserbyId)
            return res.status(404).json({
                title: "cannot get user by id",
                message: "no user with such id"
            })
        res.json(getUserbyId)
    }
    catch (err) {
        res.status(400).json({
            title: "cannot get user by id",
            message: err.message
        })
    }
}
export async function getAllUsers(req, res) {

    try {
        let getAll = await userModel.find();
        res.json(getAll)
    }
    catch (err) {
        res.status(400).json({
            title: "cannot get all users ",
            message: err.message
        })
    }
}
export async function updateUser(req, res) {
    let { id } = req.params;
    let { body } = req;
    if (body.password) {
        return res.status(400).json({
            title: "Invalid update request",
            message: "Cannot update password here"
        });
    }
    try {
        let user = await userModel.findByIdAndUpdate(id, body, { new: true });
        if (!user) {
            return res.status(404).json({
                title: "User not found",
                message: "No user found with the given ID"
            });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({
            title: "Error updating user",
            message: err.message
        });
    }
}

export async function updateUserPassword(req, res) {
    let { userName, newPassword } = req.body;
    if (!userName || !newPassword) {
        return res.status(400).json({
            title: "Missing data",
            message: "userName and newPassword are required"
        });
    }
    try {
        let user = await userModel.findOne({ userName });
        if (!user) {
            return res.status(404).json({
                title: "User not found",
                message: "No user found with the given userName"
            });
        }
        user.password = newPassword; // עדכון הסיסמה
        await user.save();
        res.json({
            title: "Password updated successfully",
            user: { userName: user.userName, id: user._id }
        });
    } catch (err) {
        res.status(500).json({
            title: "Error updating password",
            message: err.message
        });
    }
}
export async function login(req, res) {
    let { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({
            title: "Missing credentials",
            message: "userName and password are required"
        });
    }
    try {
        let user = await userModel.findOne({ userName, password });
        if (!user) {
            return res.status(404).json({
                title: "Login failed",
                message: "Invalid userName or password"
            });
        }
        res.json({
            title: "Login successful",
            user: { userName: user.userName, id: user._id }
        });
    } catch (err) {
        res.status(500).json({
            title: "Error logging in",
            message: err.message
        });
    }
}




