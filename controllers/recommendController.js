const axios = require('axios');
const db = require("../util/mysql");

const url = 'http://api.kcisa.kr/openapi/service/rest/meta13/getNLSF0401';
const serviceKey = '2976f694-b1bf-4a41-af80-1f7a155e8e91'; 
const numOfRows = '6'; 
const pageNo = '2'; 


const queryParams = new URLSearchParams({
  serviceKey: serviceKey,
  numOfRows: numOfRows,
  pageNo: pageNo
});



    const recommend = async (req, res)=>{//관리자가 일정 기간을 주기로 데이터를 받아야 함.
      axios.get(`${url}?${queryParams.toString()}`, {
        timeout: 12000 // 12초 타임아웃 설정
      })
        .then(async response => {

          const resultCode = response.data.response.header.resultCode;
          const resultMsg = response.data.response.header.resultMsg;
      
          if (resultCode === '0000') {
            const items = response.data.response.body.items;
      
            let querystr = "insert into recommendBooks values(?,?,?,?)";
            for(let i=0;i<6;i++){
              try{
 
                const [result] = await db.query(querystr,[items.item[i].title, items.item[i].rights, items.item[i].creator, items.item[i].description]);
       
            }catch(error){
                throw new Error("추천 도서 정보 입력 오류");
            }
          }
              
          } else {
            console.log(resultCode);
          }
          res.render("index");
        })
        .catch(error => {
          console.log(error.message); // 에러를 로그로 출력
          res.render("index");
        });
            

        
    }

    const readRecommendBooks = async(req, res)=>{
      try{
        let queryStr = "select * from recommendBooks"
        let [results, field] = await db.query(queryStr);
        return res.render("index", {"results": results});
    }catch(error){
        throw new Error("추천 도서 가져오기 실패");
    }
      
    }

  
    module.exports.recommend = recommend;
    module.exports.readRecommendBooks = readRecommendBooks;

