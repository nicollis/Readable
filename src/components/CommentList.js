import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Col, Row, Button } from 'react-bootstrap'
import Comment from './Comment'
import Dropdown from 'react-dropdown'
import { getComments, changeFilter, SORT_OPTIONS,
  CHANGE_COMMENT_FILTER, commentVote, toggleCommentModal,
  postComment, deleteComment, editComment, updateComment,
} from '../actions'
import { sort, uuid } from '../utils/helpers'
import FieldGroup from './FieldGroup' 
import Modal from 'react-modal'
import GoRadioTower from 'react-icons/lib/go/radio-tower'

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
    switch(this.props.comments.meta.editComment === false) {
      case true:
        this.props.postComment({
          id: uuid(),
          timestamp: Date.now(),
          body: event.target.body.value,
          author: event.target.author.value,
          parentId: this.props.comments.meta.parentId 
        })
        break
      case false:
        this.props.updateComment(this.props.comments.details.id,{
          timestamp: Date.now(),
          body: event.target.body.value
        })
        break
      default:
        break
    }
  }

  deleteComment = (comment_id) => {
    this.props.deleteComment(comment_id)
  }

  editComment = (comment_id) => {
    this.props.editComment(comment_id)
  }

  modal = (isOpen, onClose) => {
    const isEditing = this.props.comments.meta.editComment !== false
    const { author, body } = this.props.comments.details
    return (
      <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add Comment" >
        <h3>{isEditing ? 'Edit' : 'Add'} Comment</h3>
        <form onSubmit={this.addComment.bind(this)}>
          <FieldGroup id='author' type='text' label="Username" placeholder='Username' disabled={isEditing} defaultValue={author}/> 
          <FieldGroup id='body' componentClass='textarea' label="Comment" placeholder='comment' defaultValue={body} />
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
    )
  }

  render() {
    const comments = this.props.comments.data || [ ]
    const filter = this.props.comments.filter

    return (
      <Panel header={ this.panelTitle(comments.length) }>
        <Row style={{'marginBottom': '10px'}}>
          <Col sm={2}>
            <Button onClick={ this.props.toggleCommentModal }><GoRadioTower /> Add Comment</Button>
          </Col>
          <Col sm={2} smOffset={8}>
            <Dropdown className='' options={SORT_OPTIONS} onChange={this.reorderList} value={ filter } placeholder="Sort Post"/>
          </Col>
        </Row>
        { comments.filter(c=>!c.deleted).sort(sort(filter.sortColumn)).map(comment => ( 
          <Comment 
            key={comment.id} 
            data={comment}
            onVote={(positive)=>{this.vote(positive, comment.id)}}
            onDelete={this.deleteComment.bind(this)}
            onEdit={this.editComment.bind(this)}
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
  deleteComment,
  editComment,
  updateComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
