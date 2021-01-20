const express = require('express');  
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;  //서버 포트번호 : 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//클라이언트가 이 경로에 접속하게 되면 고객 정보를 담고 있는 배열을 json형식으로 반환할 수 있도록 해야함
app.get('/api/customers', (req, res) => {
    res.send([
        {
        'id' : 1,
        'image' : 'https://placeimg.com/64/64/1',
        'name': 'Seo',
        'birthday' : '971106',
        'gender' : '남자',
        'job': '대학생'
      },
      {
        'id' : 2,
        'image' : 'https://placeimg.com/64/64/2',
        'name': 'Kim',
        'birthday' : '981211',
        'gender' : '여자',
        'job': '대학생'
      },
      {
        'id' : 3,
        'image' : 'https://placeimg.com/64/64/3',
        'name': 'Park',
        'birthday' : '950712',
        'gender' : '남자',
        'job': '프로그래머'
      }
      ])
})

app.listen(port, () => console.log(`Listening on port ${port}`)); //5000번 포트로 동작 시키기, 동작중이면 메세지 출력