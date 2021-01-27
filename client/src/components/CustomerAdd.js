import React from 'react';
import { post } from 'axios';  //post 방식으로 고객추가데이터를 서버로 보낼 수 있도록 추가

class CustomerAdd extends React.Component{

    constructor(props){  //생성자 정의
        super(props);  
        this.state = {   //state변수값을 초기
            file: null,  //프로필 이미지를 파일형태로 보낼 수 있도록 해야하기때문에 null로 초기화(바이트 형태의 데이터)
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' //보내고자 하는 파일 이미지의 이름

        }
    }

//구현해야할 함수 : handleFormSubmit, handleFileChange, handleValueChange
    handleFormSubmit = (e) =>{ // 이벤트 변수 전달받음(e)
        e.preventDefault() //데이터가 서버로 전달됨에 있어서 오류가발생하지 않도록 함수 불러옴
        this.addCustomer() 
            .then((response) => {  //서버로 부터 어떤 response가 건너왔을때
                console.log(response.data); //그 건너온 데이터를 콘솔창에 출력함
                this.props.stateRefresh();
            })
            this.setState({
                file: null,  //프로필 이미지를 파일형태로 보낼 수 있도록 해야하기때문에 null로 초기화(바이트 형태의 데이터)
                userName: '',
                birthday: '',
                gender: '',
                job: '',
                fileName: ''
            })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {  //addCustomer 모둘 생셩
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        //파일이 포함되어있는 어떠한 데이터를 서버로 전송하고자 할때는 웹 표준에 맞는 헤더를 추가해야함 
        const config = {
            headers: { //내가 지금 보내고자 하는 데이터가 multipart/form-data(전달하고자 하는 데이터에 파일이 포함되어 있을때)라고 설정 
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    render(){
        return(
            //고객추가 버튼을 눌렀을 때 handleFormSubmit 함수가 수행됨
            <form onSubmit={this.handleFormSubmit}> 
                <h1>고객추가</h1>
                프로필 이미지: <input type= "file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/> 
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;