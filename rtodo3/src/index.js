
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// CodePenでの表示では不要なのコメントアウト
import React, { Component } from 'react';
 
// CodePenでの表示用




// Inputコンポーネントの作成
class Input extends Component {
  constructor(props){
    super(props);
    this.state={
      todo:""
    };
    this.addTodo = this.addTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.copyTodo=this.copyTodo.bind(this);
  }

  addTodo(){
    this.props.addTodo(this.refs.newText.value);
    //初期化
    this.refs.newText.value='';
  }

  copyTodo(){
    this.props.copyTodo(this.state.copy);
    this.refs.newText.value='';
  }

  handleChange(e){
    this.setState({
      todo: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    let newtodo = this.state.todo;
    if(newtodo === "" ){
        return(false);
    }
    if(newtodo !== "" ){
      this.props.onClick(newtodo);
      this.setState({newtodo:""});
    }
  }


  render() {
    return (
      
      <div>
          <form onSubmit={this.handleSubmit}>
          <input type="button" value="追加" onClick={this.addTodo} onChange={this.handleChange}/>
          <input type="text" ref="newText"/>

          <input type="button" value="表示" onClick={this.copyTodo}/>
          
          </form>
      </div>
    )
  }
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todo: [],
      copy:[]
    };
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.copyTodo = this.copyTodo.bind(this);
  }
  // 新規追加
  addTodo(value) {
    // 追加
    this.state.todo.push({
      title: value
    });
    // 保存
    this.setState({
      todo : this.state.todo
    });
  }

  copyTodo(value){
    this.state.copy.push({
      title: value
    });
    this.state.todo.splice(value, 1);
    this.setState({
      copy: this.state.copy
      
    });
    this.setState({
      todo : this.state.todo
    });
  }
 
  // 削除機能
  deleteTodo(i) {
    // 削除
    this.state.todo.splice(i, 1);
    // 保存
    this.setState({
      todo : this.state.todo
    });
  }

 
 
  render() {
    return (
      <div>
        <h1>TODOアプリ</h1>
        <List todo={this.state.todo} deleteTodo={this.deleteTodo} copy={this.state.copy} copyTodo={this.copyTodo}/>
        <Input addTodo={this.addTodo} copyTodo={this.copyTodo} copy={this.state.copy} />
        
      </div>
     
    );
  }
}

// Listコンポーネントの作成
function List(props){  
  return (
    <ul>
      {props.todo.map( (todo, i) => {
        return <li key={i}>{todo.title} <input type="button" value="削除"
                              onClick={() => props.deleteTodo(i)}/>
                             
                              <input type="button" value="完了" onClick={()=>props.copyTodo(i)}　/></li>
      })}
    </ul>
  )
};


// CodePenでの表示では不要なのコメントアウト
// export default App;

// CodePenで表示を行う用の処理
ReactDOM.render(
	<App />,
	document.getElementById('root')
);
serviceWorker.unregister();
