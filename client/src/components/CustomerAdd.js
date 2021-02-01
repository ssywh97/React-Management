import React from 'react';
import { post } from 'axios';  //post 방식으로 고객추가데이터를 서버로 보낼 수 있도록 추가
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})
class CustomerAdd extends React.Component{

    constructor(props){  //생성자 정의
        super(props);  
        this.state = {   //state변수값을 초기
            file: null,  //프로필 이미지를 파일형태로 보낼 수 있도록 해야하기때문에 null로 초기화(바이트 형태의 데이터)
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '', //보내고자 하는 파일 이미지의 이름
            open: false

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
                fileName: '',
                open: false
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

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,  //프로필 이미지를 파일형태로 보낼 수 있도록 해야하기때문에 null로 초기화(바이트 형태의 데이터)
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type= "file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                         <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                         <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                     </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);

// import React from 'react';
// import { post } from 'axios';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//     hidden: {
//         display: 'none'
//     }
// });

// class CustomerAdd extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             file: null,
//             userName: '',
//             birthday: '',
//             gender: '',
//             job: '',
//             fileName: '',
//             open: false
//         }
//     }

//     handleFormSubmit = (e) => {
//         e.preventDefault()
//         this.addCustomer()
//             .then((response) => {
//                 console.log(response.data);
//                 this.props.stateRefresh();
//             })
//         this.setState({
//             file: null,
//             userName: '',
//             birthday: '',
//             gender: '',
//             job: '',
//             fileName: '',
//             open: false
//         })
//     }

//     handleFileChange = (e) => {
//         this.setState({
//             file: e.target.files[0],
//             fileName: e.target.value
//         })
//     }

//     handleValueChange = (e) => {
//         let nextState = {};
//         nextState[e.target.name] = e.target.value;
//         this.setState(nextState);
//     }

//     addCustomer = () => {
//         const url = '/api/customers';
//         const formData = new FormData();
//         formData.append('image', this.state.file);
//         formData.append('name', this.state.userName);
//         formData.append('birthday', this.state.birthday);
//         formData.append('gender', this.state.gender);
//         formData.append('job', this.state.job);
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         }
//         return post(url, formData, config);
//     }

//     handleClickOpen = () => {
//         this.setState({
//             open: true
//         });
//     }

//     handleClose = () => {
//         this.setState({
//             file: null,
//             userName: '',
//             birthday: '',
//             gender: '',
//             job: '',
//             fileName: '',
//             open: false
//         })
//     }

//     render() {
//         const { classes } = this.props;
//         return (
//             <div>
//                 <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
//                     고객 추가하기
//                 </Button>
                
//                 <Dialog open={this.state.open} onClose={this.handleClose}>
//                     <DialogTitle>고객 추가</DialogTitle>
//                     <DialogContent>
//                         <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
//                         <label htmlFor="raised-button-file">
//                             <Button variant="contained" color="primary" component="span" name="file">
//                                 {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
//                             </Button>
//                         </label>
//                         <br/>
//                         <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
//                         <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
//                         <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
//                         <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
//                         <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
//                     </DialogActions>
//                 </Dialog>
//             </div>
//         )
//     }

// }

// export default withStyles(styles)(CustomerAdd);