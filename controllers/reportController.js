const path = require("path");
const Report = require("../models/report");
const ReportProcessor = require("../models/reportProcessor");
var session = require('express-session');     



let rProcessor = new ReportProcessor();

const registerReport = async (req, res) => {
    let form = req.body;
   
    let newReport = new Report(form.rNum, req.cookies.userId, form.rTitle, form.rBookTitle, form.rContent, form.date);
  
    try{
        await rProcessor.save(newReport);

    }catch (error){
        return res.render("record/recordDetail", { message: errorMsg});
    }

    return res.redirect("/record");


}


const showReports = async(req, res)=>{
    let reports = null;
    try{
        reports = await rProcessor.fetchAll(req.cookies.userId);
    }catch(error){
        return res.render("record/record", {message: errorMsg});
    }
    res.render("record/record", {"reports": reports});
    

}

const readReport = async(req, res)=>{
    let report = null;
    try{
        report = await rProcessor.readFind(req.query.reportNum);
    }catch(error){
        return res.render("record/record");
    }
    res.render("record/readDetail", {"report": report});

}

const deleteReport = async(req, res)=>{
    try{
        await rProcessor.delReport(req.query.reportNum);
    }catch(error){
        return res.render("record/record");
    }
    return res.redirect("/record");

}



const modifyReport = async (req, res) => {
    console.log("수정 컨트");
    let form = req.body;
    let mReport = [form.rNum, form.rTitle, form.rBookTitle, form.rContent];
  
    try{
        await rProcessor.modiReport(mReport);

    }catch (error){
        return res.render("record/readDetail");
    }
    return res.redirect("/record");

   
}




module.exports.registerReport = registerReport;
module.exports.showReports = showReports;
module.exports.readReport = readReport;
module.exports.deleteReport = deleteReport;
module.exports.modifyReport= modifyReport;