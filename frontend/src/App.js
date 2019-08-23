import React, { Component } from 'react';
import TodoList from './TodoList'
import './App.css';
import Form from './Form'

class App extends Component {
  constructor() {
    super()
    const todos = []
    this.state = {
      isLoading: false,
      hasError: false,
      todos: todos,
      countTodo: todos.length + 1,
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const text = e.target.desc.value;
    const todos = this.state.todos.slice()
    const countTodo = this.state.countTodo

    const method = "POST"
    const body = JSON.stringify({ title, text })
    console.log(body)
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const url = "http://localhost:1323/todo"
    fetch(url, { method, mode: "cors", headers, body
    }).then((res) => {
      return res.json()
    }).then((res) => {
      todos.push({
        id: res.id,
        title: res.title,
        desc: res.text,
        done: false,
      });

      this.setState({ todos })
      this.setState({ countTodo: countTodo + 1 })

    }).then(console.log).catch(console.error);
    
    e.target.title.value = '';
    e.target.desc.value = '';

  }

  setTodoStatus(clickTodo) {
    const todos = this.state.todos.slice();
    const todo = todos[clickTodo.id - 1];
    todo.done = !todo.done
    todos[clickTodo.id - 1] = todo;

    this.setState({ todos });
  }

  fetchData() {
    this.setState({ isLoading: true })

    const method = "GET"
    // const body = JSON.stringify({ title, text })
    // console.log(body)
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const url = "http://localhost:1323/todos"
    fetch(url, { method, mode: "cors", headers
    }).then((res) => {
      console.log(res)
      if (!res.ok) {
        throw Error(res.statusText)
      }
      this.setState({ isLoading: false })

      return res.json()
    }).then((res) => {
      const todos = res.map(res => {
        const todo = Object.assign({}, res, { done: false })
        return todo
      })
      let countTodo = this.state.countTodo

      console.log(todos)
      this.setState({ todos,  countTodo})
    }).catch(() => this.setState({ hasError: true }))

  }


  //   fetch(url).then((response) => {
  //     console.log(response)
  //     if (!response.ok) {
  //       throw Error(response.statusText)
  //     }
  //     this.setState({ isLoading: false })
  //     return response
  //   }).then((response) => { response.json()
  //   }).then((data) => {
  //     let countTodo = this.state.countTodo
  //     const todos = data.map(data => {
  //       const todo = Object.assign({}, data, { id: countTodo++, done: false })
  //       return todo
  //     })
  //     this.setState({ todos, countTodo })
  //   }).catch(() => this.setState({ hasError: true }))
  // }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className="app">
        <h1>todoアプリ作成</h1>
        <Form handleSubmit={this.handleSubmit.bind(this)} />
        <TodoList
          todos={this.state.todos}
          setTodoStatus={this.setTodoStatus.bind(this)}
          isLoading={this.state.isLoading}
          hasError={this.state.hasError}
        />
      </div>
    );
  }
}

export default App

// function App() {


//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
