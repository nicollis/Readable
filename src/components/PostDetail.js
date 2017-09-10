import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Well } from 'react-bootstrap'
import { getPost } from '../actions'
import Score from './Score'
import moment from 'moment'

class PostDetail extends Component {

  componentDidMount() {
    const { post_id } = this.props.match.params
    this.props.getPost(post_id)   
  }

  render() {
    const { timestamp, title, author, category, voteScore, id, body } = this.props.posts.details

    return(
      <Well>
        <Score score={voteScore} upVote={''} downVote={''} style={{ verticalAlign: 'top' }}/>
        <Col xs={9} className='vcenter'>
          <Row style={{fontSize: '30px'}}>{title}</Row>
          <Row style={{ margin: '30px' }}>{body}</Row>
        </Col>
        <Col xs={2} className='text-right vcenter' style={{ verticalAlign: 'top' }}>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
