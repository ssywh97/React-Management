// import React, {Component} from 'react';
// import Customer from './components/Customer';
// import CustomerAdd from './components/CustomerAdd';
// import './App.css';
// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
// import TableBody from '@material-ui/core/TableBody';
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';
// import { withStyles } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';

// const styles = theme => ({  //스타일 변수
//   root: {
//     width: '100%',  //너비 100%
//     marginTop: theme.spacing.unit *3,  //윗쪽 여백은 3의 가중치만큼
//     overflowX: "auto"  //x축으로 오버플로우가 발생할 수 있도록 함
//   },
//   table: {
//     minWidth: 1080  //테이블은 1080픽셀 이상 출력될 수 있도록 
//   },
//   progress: {
//     margin: theme.spacingunit *2
//   }
// })

// /* 리액트 컴포넌트의 라이프싸이클
// 1. constructor()

// 2.componentWillMount()

// 3.render()

// 4.componentDidMount()
// */
// /*

// props or state => shouldComponentUpdate()

// */ 

// class App extends Component {

//   constructor(props){
//     super(props);
//     this.state = {
//       customers: '',
//       completed: 0
//     }
//   }

  
//   stateRefresh = () => {
//     this.setState({
//       customers:'',
//       completed: 0
//     });
//     this.callApi()  //고객데이터를 불러오는 부분
//       .then(res => this.setState({customers: res}))
//       .catch(err => console.log(err));
//   }

//   componentDidMount() { //api서버에 접근(api를 비동시적으로 호출)
//     this.timer = setInterval(this.progress, 100);
//     this.callApi()
//       .then(res => this.setState({customers: res}))
//       .catch(err => console.log(err));
//   }

//   callApi = async () => {
//     const response = await fetch('/api/customers');
//     const body = await response.json();  //고객정보를 json형태로 body변수에 담음
//     return body;
//   }

//   progress = () => {
//     const {completed} = this.state;
//     this.setState({completed: completed >= 100 ? 0 : completed + 1})
//   }
//     render(){
//       const { classes } = this.props;
//      return (
//        <div>
//        <Paper className={classes.root}>
//          <Table className={classes.table}>
//            <TableHead>
//              <TableRow>
//                <TableCell>번호</TableCell>
//                <TableCell>이미지</TableCell>
//                <TableCell>이름</TableCell>
//                <TableCell>생년월일</TableCell>
//                <TableCell>성별</TableCell>
//                <TableCell>직업</TableCell>
//                <TableCell>설정</TableCell>
//               </TableRow>
//            </TableHead>
//            <TableBody>
//          {
//            this.state.customers ? this.state.customers.map(c => { //this.state.customers의 값이 true일때만 수행  
//              return(
//                <Customer
//                 stateRefresh={this.stateRefresh}
//                 key={c.id}
//                 id={c.id}
//                 image={c.image}
//                 name={c.name}
//                 birthday={c.birthday}
//                 gender={c.gender}
//                 job={c.job}
//                />
//              );
//            }) :
//            <TableRow>
//              <TableCell colspan="6" align="center">
//                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>

//              </TableCell>
//              </TableRow> 
//            }
//          </TableBody>
//            </Table>
//       </Paper>
//       <CustomerAdd stateRefresh={this.stateRefresh}/>
//       </div>
//      );
//   }
// }

// export default withStyles(styles)(App);
import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }


  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => { //데이터에 필터 적용
        return c.name.indexOf(this.state.searchKeyword) > -1; //사용자가 검색한 키워드가 포함되어 있는지 여부 확인
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> 
      });
    }
    const { classes } = this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name="searchKeyword" //검색창에 입력된 문자열을 searchkeyword로 관리
                value={this.state.searchKeyword}
                onChange={this.handleValueChange} // 실제로 값이 변경되면 handleValueChange 함수를 불러올수 있게됨
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? 
                filteredComponents(this.state.customers) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);