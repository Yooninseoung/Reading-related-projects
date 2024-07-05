const fs = require("fs");
const db = require("../util/mysql");
const Report = require("../models/report");

class ReportProcessor {
  

    async save(report){
        if(report instanceof Report){
            try{
                let querystr = "insert into report values(?,?,?,?,?,?)";
                const [result] = await db.query(querystr,[report.rNum, report.userId, report.rTitle, report.rBookTitle, report.rContent, report.date]);
                //console.log(result.insertId)

            }catch(error){
                throw new Error("보고서 정보 입력 오류");
            }
        }
    }



    async fetchAll(userId){
        try{
            
            let queryStr = "select * from report where userId = ? order by reportNum desc"
            let [results, field] = await db.query(queryStr,[userId]);
            return results;
        }catch(error){
            throw new Error("보고서 가져오기 실패");
        }
    }

    async readFind(reportNum){
        try{
            let queryStr = "select * from report where reportNum = ?"
            let [results, field] = await db.query(queryStr,[reportNum]);
            return results;
        }catch(error){
            throw new Error("상세 보고서 가져오기 실패");
        }
    }

    
    async delReport(reportNum){
        try{
            let queryStr = "delete from report where reportNum = ?"
            await db.query(queryStr,[reportNum]);
            return;
        }catch(error){
            throw new Error("상세 보고서 가져오기 실패");
        }
    }
    

    async modiReport(mReport){
        console.log(mReport);
        try{
            let queryStr = "update report set reportTitle=?, reportBookTitle=?, reportContent=? where reportNum = ?"
            await db.query(queryStr,[mReport[1], mReport[2], mReport[3], mReport[0] ]);
            return;
        }catch(error){
            throw new Error("상세 보고서 가져오기 실패");
        }
    }


}

module.exports = ReportProcessor;