const express = require("express");

const router = express.Router();


router.get("/", (req,res)=>{
    res.render("search/search");
})

router.get("/communityDetail", (req,res)=>{
    res.render("search/searchDeatil");
})


module.exports = router;