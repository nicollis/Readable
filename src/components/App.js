import React, { Component } from 'react';
import AppNav from './AppNav';
import PostList from './PostList'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <AppNav/>
        <PostList />
      </div>
    );
  }
}

export default App;
