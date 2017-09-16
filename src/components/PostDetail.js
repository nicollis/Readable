import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Well, Button } from 'react-bootstrap'
import { getPost, postVote, deletePost } from '../actions'
import Score from './Score'
import moment from 'moment'
import GoTrashcan from 'react-icons/lib/go/trashcan'
import GoPencil from 'react-icons/lib/go/pencil'

class PostDetail extends Component {
  constructor() {
    super()
    this.vote = this.vote.bind(this)
  }

  componentDidMount() {
    const { post_id } = this.props.match.params
    this.props.getPost(post_id)   
  }

  vote = (positive) => {
    const vote = positive ? 'upVote' : 'downVote'
    this.props.postVote(this.props.posts.details.id, vote)
  }

  delete = (id, category) => {
    this.props.deletePost(id)
    window.location = `/${category}`
  }

  render() {
    const { id, timestamp, title, author, voteScore, body, category } = this.props.posts.details

    return(
      <Well>
        <Score score={voteScore || 0} upVote={this.vote} style={{ verticalAlign: 'top' }}/>
        <Col xs={9} className='vcenter'>
          <Row style={{fontSize: '30px'}}>{title}</Row>
          <Row style={{ margin: '30px' }}>{body}</Row>
        </Col>
        <Col xs={2} className='text-right vcenter' style={{ verticalAlign: 'top' }}>
          <Row>
           <Button onClick={()=>{window.location=`/${category}/${id}/editor`}}bsSize='xsmall' bsStyle='warning' style={{marginRight: '5px'}}><GoPencil /></Button> 
           <Button onClick={()=>this.delete(id,category)} bsSize='xsmall' bsStyle='danger' ><GoTrashcan /></Button> 
          </Row>
          <Row>
            {author}
          </Row>
          <Row>
            { moment(timestamp).format('MMM Do YY, h:mm a') }
          </Row>
        </Col>
       </Well> 
    )
  }
}

const mapStateToProps = (state) => {
  const { posts } = state

  return {
    posts: posts,
  }
}

const mapDispatchToProps = {
   getPost,
   postVote,
   deletePost,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
