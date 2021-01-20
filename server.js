const express = require('express');  
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;  //서버 포트번호 : 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {  //api경로의 hello로 접속하면 사용자 메세지 출력
    res.send({message: 'Hello Express!'});
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //5000번 포트로 동작 시키기, 동작중이면 메세지 출력