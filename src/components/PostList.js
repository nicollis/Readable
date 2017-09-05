import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Dropdown from 'react-dropdown'
import Post from './Post'
import { getPosts } from '../actions'

class PostList extends Component {

  // TODO BUILD OUT SORT FUNCTION

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const posts_list = this.props.posts.data || [ ]
    const sort_opts = [
      { value: 'votes', label: 'Up Votes' },
      { value: 'time', label: 'Newest' }
    ]

    return(
      <Col>
        <Row style={{'marginBottom': '10'}}>
          <Col sm={2} smOffset={10}>
            <Dropdown className='' options={sort_opts} onChange={()=>{}} value={sort_opts[0]} placeholder="Sort Post"/>
          </Col>
        </Row>
        <Row>
          { posts_list.map(post => (<Post key={post.id} data={post}/>)) }
        </Row>
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
