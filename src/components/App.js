import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import AppNav from './AppNav';
import PostList from './PostList'
import PostDetail from './PostDetail'
import CommentList from './CommentList'
import PostForm from './PostForm'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Route path="/:category?" component={AppNav} />
        <Route exact path="/" component={PostList} />
        <Route exact path="/:category" component={PostList}/>
        <Route exact path="/:category/:post_id" render={props => (
          <div>
            <PostDetail {...props} />
            <CommentList {...props} />
          </div>
        )}/>
        <Route exact path='/:category/new/editor' component={PostForm}/>
      </div>
    );
  }
}

export default App;
