const fs = require('fs');
const express = require('express');  
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;  //서버 포트번호 : 5000
//데이터베이스와 연동하는 작업

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,    //conf변수로 database에서 읽어드린 json값을 가죠온다 뭐 이정도...잘몰라 
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});

connection.connect(); // 연결 수행


//클라이언트가 이 경로에 접속하게 되면 고객 정보를 담고 있는 배열을 json형식으로 반환할 수 있도록 해야함
app.get('/api/customers', (req, res) => {
    connection.query(   //데이터베이스에 접근해서 쿼리를 날림
      "SELECT * FROM CUSTOMER",  //데이터를 가져오는 쿼리
      (err, rows, fields) => {  //가져온 데이터는 rows변수로 처리
        res.send(rows);
      }
    )
})

app.listen(port, () => console.log(`Listening on port ${port}`)); //5000번 포트로 동작 시키기, 동작중이면 메세지 출력