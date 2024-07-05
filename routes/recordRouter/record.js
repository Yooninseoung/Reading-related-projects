const express = require("express");
const reportController = require("../../controllers/reportController");

const router = express.Router();


router.get("/", reportController.showReports);


router.get("/recordDetail", (req,res)=>{
    res.render("record/recordDetail");
})

router.get("/readDetail", reportController.readReport)

router.post("/recordProcess", reportController.registerReport);

router.get("/deleteReport", reportController.deleteReport);

router.post("/modifyReport", reportController.modifyReport);


module.exports = router;