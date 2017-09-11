import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Col, Row, Button } from 'react-bootstrap'
import Comment from './Comment'
import Dropdown from 'react-dropdown'
import { getComments, changeFilter, SORT_OPTIONS,
  CHANGE_COMMENT_FILTER, commentVote, toggleCommentModal,
  postComment,
} from '../actions'
import { sort, FieldGroup, uuid } from '../utils/helpers'
import Modal from 'react-modal'

class CommentList extends Component {
  
  componentDidMount() {
    const { post_id } = this.props.match.params
    this.props.getComments(post_id)
  }

  panelTitle = (count = 0) => { return(
    <h3>Comments: {count}</h3>
  )}

  reorderList = (sort) => {
    this.props.changeFilter(sort, CHANGE_COMMENT_FILTER)
  }

  vote = (positive, id) => {
    const vote = positive ? 'upVote' : 'downVote'
    this.props.commentVote(id, vote)
  }

  addComment = (event) => {
    const payload = {
      id: uuid(),
      timestamp: Date.now(),
      body: event.target.body.value,
      author: event.target.author.value,
      parentId: this.props.comments.meta.parentId 
    }
    
    this.props.postComment(payload)
  }

  modal = (isOpen, onClose) => (
      <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add Comment" >
        <h3>Add Comment</h3>
        <form onSubmit={this.addComment.bind(this)}>
          <FieldGroup id='author' type='text' label="Username" placeholder='Username' /> 
          <FieldGroup id='body' componentClass='textarea' label="Comment" placeholder='comment' />
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
  )

  render() {
    const comments = this.props.comments.data || [ ]
    const filter = this.props.comments.filter

    return (
      <Panel header={ this.panelTitle(comments.length) }>
        <Row style={{'marginBottom': '10px'}}>
          <Col sm={2}>
            <Button onClick={ this.props.toggleCommentModal }>Add Comment</Button>
          </Col>
          <Col sm={2} smOffset={8}>
            <Dropdown className='' options={SORT_OPTIONS} onChange={this.reorderList} value={ filter } placeholder="Sort Post"/>
          </Col>
        </Row>
        { comments.sort(sort(filter.sortColumn)).map(comment => ( 
          <Comment 
            key={comment.id} 
            data={comment}
            onVote={(positive)=>{this.vote(positive, comment.id)}}
          /> 
        )) }
        
        { this.modal(this.props.comments.meta.modalOpen, this.props.toggleCommentModal) }
      </Panel>
    )
  }
}

const mapStateToProps = (state) => {
  const { comments } = state

  return {
    comments,
  }
}

const mapDispatchToProps = {
  getComments, 
  changeFilter,
  commentVote,
  toggleCommentModal,
  postComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
