const User = require("./user");
const db = require("../util/mysql");

class UserProcessor {

    save(user) {
        console.log("save 시작");

        if(user instanceof User){
            try{
                let quetstr = "insert into user values(?,?,?,?,?)";
                db.query(quetstr,[user.uId, user.uPassword, user.uName, user.uPhone, user.uAdress]);

            }catch (error){
                throw new Error("유져 정보 입력 오류");
            }
        }

    }


    async loginTest(uId, uPassword, success, fail){
        console.log("눌림2");
        let queystr = "SELECT userId, userPassword FROM user WHERE userId=?";
        try{
            let [results, field]= await db.query(queystr, [uId]);
            if(results[0]["userPassword"]===uPassword){
    
                success(uId);
            }else{
                console.log("로그인 실패");
                fail();
            }

        }catch(erroe){
            fail();
        }


    }
}

   

module.exports = UserProcessor;