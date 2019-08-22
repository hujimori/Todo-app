import React, {Component} from 'react';
import TodoList from './TodoList'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [
        {
          id: 1,
          title: "Hello, React!",
          desc: "React始めました",
          done: "false"
        },
        {
          id: 2,
          title: "Hello, Redux!",
          desc: "Reduxも始めました",
          done:false
        },
      ]
    }
  }

  render() {
    return (
      <div className="app">
        <h1>todoアプリ作成</h1>
        <TodoList todos={this.state.todos}/>
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
