import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Post from './Post'
import { getPosts } from '../actions'

class PostList extends Component {

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const posts_list = this.props.posts.data || [ ]

    return(
      <Col>
        { posts_list.map(post => (<Post key={post.id} data={post}/>)) }
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  const { posts } = state

  return {
    posts
  }
}

const mapDispatchToProps = {
  getPosts,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
