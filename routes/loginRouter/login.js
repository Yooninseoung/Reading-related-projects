const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();


router.get("/", (req,res)=>{
    res.render("login/login");
})

router.get("/signUp", (req,res)=>{
    res.render("login/signUp");
})

router.get("/logout", (req,res)=>{
    res.clearCookie("connect.id");
    res.clearCookie("userId");
    res.redirect("/");
})

router.post("/signProcess", userController.registerUser);

router.post("/loginProcess", userController.loginProcess);

module.exports = router;