import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Well, Row, Col, Label, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Score from './Score'
import moment from 'moment'
import { getComments, postVote, deletePost } from '../actions'
import GoTrashcan from 'react-icons/lib/go/trashcan'
import GoPencil from 'react-icons/lib/go/pencil'

class Post extends Component {
  constructor() {
    super()
    this.vote = this.vote.bind(this)
  }

  componentDidMount() {
   this.props.getComments(this.props.data.id) 
  }

  vote = (positive) => {
    const vote = positive ? 'upVote' : 'downVote'
    this.props.postVote(this.props.data.id, vote)
  }

  render() {
    const {data} = this.props
    const { timestamp, title, author, category, voteScore, id } = data
    const comment_count = (this.props.posts.meta[id] && this.props.posts.meta[id].comment_count) || 0
    return (
     <Well>
      <Score score={voteScore} upVote={this.vote} />
      <Col xs={9} className='vcenter'>
        <div style={{fontSize: '30px'}}><Link to={`/${category}/${id}`} >{title}</ Link></div>
        <Label>comments: {comment_count}</Label>
      </Col>
      <Col xs={2} className='text-right vcenter'>
        <Row>
         <Button onClick={()=>{window.location=`/${category}/${id}/editor`}}bsSize='xsmall' bsStyle='warning' style={{marginRight: '5px'}}><GoPencil /></Button> 
         <Button onClick={()=>this.props.deletePost(id)} bsSize='xsmall' bsStyle='danger' ><GoTrashcan /></Button> 
        </Row>
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
  postVote,  
  deletePost,
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
