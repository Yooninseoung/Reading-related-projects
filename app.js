const express = require("express");
var session = require('express-session');     
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const path =require("path");



const loginRouter = require("./routes/loginRouter/login");
const searchRouter = require("./routes/searchRouter/search");
const recordRouter = require("./routes/recordRouter/record");

const recommendController = require("./controllers/recommendController");

const app = express();


app.set("view engine", 'hbs');
app.use(express.urlencoded({extended:true}));
app.use("/", express.static("public"));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(cookieParser());


app.get('/', (req, res, next) => {
    if (req.headers.cookie) {
      next();
    } else {
      console.log("로그인 실패");
      res.redirect('/login');
    }
  });


app.use("/login", loginRouter);
app.use("/search", searchRouter);
app.use("/record", recordRouter);


app.get("/recommend", recommendController.readRecommendBooks);
app.get("/manager/recommend", recommendController.recommend);

app.post("/search",(req,res)=>{
  res.render('search/search',{
    "bookName":req.body.bookName
  });
  

});

app.get("/",(req,res)=>{
    res.render("index");
});





app.listen(3000);

//로그인 참고 : https://github.com/charles098/Nodejs-login-example/blob/main/session-login/app.js
//https://kong-dev.tistory.com/131

// 아 리다이렉트하면되네.. 로그인 검사하고 리다이렉트 하자


