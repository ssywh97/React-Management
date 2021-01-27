import React, {Component} from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({  //스타일 변수
  root: {
    width: '100%',  //너비 100%
    marginTop: theme.spacing.unit *3,  //윗쪽 여백은 3의 가중치만큼
    overflowX: "auto"  //x축으로 오버플로우가 발생할 수 있도록 함
  },
  table: {
    minWidth: 1080  //테이블은 1080픽셀 이상 출력될 수 있도록 
  },
  progress: {
    margin: theme.spacingunit *2
  }
})

/* 리액트 컴포넌트의 라이프싸이클
1. constructor()

2.componentWillMount()

3.render()

4.componentDidMount()
*/
/*

props or state => shouldComponentUpdate()

*/ 

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  
  stateRefresh = () => {
    this.setState({
      customers:'',
      completed: 0
    });
    this.callApi()  //고객데이터를 불러오는 부분
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentDidMount() { //api서버에 접근(api를 비동시적으로 호출)
    this.timer = setInterval(this.progress, 100);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();  //고객정보를 json형태로 body변수에 담음
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1})
  }
    render(){
      const { classes } = this.props;
     return (
       <div>
       <Paper className={classes.root}>
         <Table className={classes.table}>
           <TableHead>
             <TableRow>
               <TableCell>번호</TableCell>
               <TableCell>이미지</TableCell>
               <TableCell>이름</TableCell>
               <TableCell>생년월일</TableCell>
               <TableCell>성별</TableCell>
               <TableCell>직업</TableCell>
              </TableRow>
           </TableHead>
           <TableBody>
         {
           this.state.customers ? this.state.customers.map(c => { //this.state.customers의 값이 true일때만 수행  
             return(
               <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
               />
             );
           }) :
           <TableRow>
             <TableCell colspan="6" align="center">
               <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>

             </TableCell>
             </TableRow> 
           }
         </TableBody>
           </Table>
      </Paper>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
     );
  }
}

export default withStyles(styles)(App);
