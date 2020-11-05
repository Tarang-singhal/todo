import React from 'react';
import TodosList from './components/todosList/todosList';
import { BrowserRouter } from "react-router-dom";
class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <TodosList/>
      </BrowserRouter>
    );
  }
}

export default App;
