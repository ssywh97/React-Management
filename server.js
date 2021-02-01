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

//multer 라이브러리
const multer = require('multer');  //multer 불러와서 변수에 저장
const upload = multer({dest: './upload'}); //upload 폴더 설정(server의 기본 루트폴더에 있는 upload 폴더 활용)


//클라이언트가 이 경로에 접속하게 되면 고객 정보를 담고 있는 배열을 json형식으로 반환할 수 있도록 해야함
app.get('/api/customers', (req, res) => {
    connection.query(   //데이터베이스에 접근해서 쿼리를 날림
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0",  //데이터를 가져오는 쿼리
      (err, rows, fields) => {  //가져온 데이터는 rows변수로 처리
        res.send(rows);
      }
    )
})

app.use('/image', express.static('./upload'));  //express.static을 이용해서 upload폴더를 공유할 수 있도록 함???

//customers 경로의 사용자가 고객추가 데이터를 추가했을때 이를 처리함
app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';  //데이터 추가 sql
  let image = '/image/' + req.file.filename; //image경로에 있는 해당 파일 이름으로 이미지에 접근
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    });
});

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
      (err, rows, fields) => {
          res.send(rows);
      }
  )
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //5000번 포트로 동작 시키기, 동작중이면 메세지 출력