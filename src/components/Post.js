import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Well, Row, Col, Label } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Score from './Score'
import moment from 'moment'
import { getComments } from '../actions'

class Post extends Component {

  componentDidMount() {
   this.props.getComments(this.props.data.id) 
  }

  render() {
    const {data, onUpvote, onDownvote} = this.props
    const { timestamp, title, author, category, voteScore, id } = data
    const comment_count = this.props.posts.meta[id] && this.props.posts.meta[id].comment_count || 0
    return (
     <Well>
      <Score score={voteScore} upVote={onUpvote} downVote={onDownvote} />
      <Col xs={9} className='vcenter'>
        <div style={{fontSize: '30px'}}><Link to={`/${category}/${id}`} >{title}</ Link></div>
        <Label>comments: {comment_count}</Label>
      </Col>
      <Col xs={2} className='text-right vcenter'>
        <Row>
          {author} | <Label>{category}</Label>
        </Row>
        <Row>
          { moment(timestamp).fromNow() }
        </Row>
      </Col>
     </Well> 
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
  getComments,
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
