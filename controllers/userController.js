const path = require("path");
const User = require("../models/user");
const UserProcessor = require("../models/userProcessor");
var session = require('express-session');     

let usersPath = path.join(process.cwd(), "data", "users.json");

let uProcessor = new UserProcessor();

const registerUser = async (req, res) => {
    let form = req.body;
    let newUser = new User(form.uId, form.uPassword, form.uName, form.uPhone, form.uAdress);

    try{
        await uProcessor.save(newUser);
    
    } catch(error){
        res.render("login/signUp", { message: errorMsg});
    }
    res.redirect("/login");

}


const loginProcess = (req, res) =>{
    console.log("눌림");

    uProcessor.loginTest(req.body.uId, req.body.uPassword,(user)=>{
        const privateKey = Math.floor(Math.random() * 1000000000);
                session[privateKey] = user;
                console.log("로그인 성공");
                res.setHeader('Set-Cookie', `connect.id=${privateKey}; path=/`);
                res.cookie('userId', user);
                res.redirect('/recommend');
    }, ()=>{
        console.log("로그인 실패1");
        res.render("login/login")})

}


module.exports.registerUser = registerUser;

module.exports.loginProcess = loginProcess;