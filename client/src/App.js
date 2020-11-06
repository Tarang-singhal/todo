import React from 'react';
import AllLists from './components/AllLists/AllLists';
import { BrowserRouter } from "react-router-dom";
class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <AllLists/>
      </BrowserRouter>
    );
  }
}

export default App;
