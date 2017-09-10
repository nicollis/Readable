import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Col, Row } from 'react-bootstrap'
import Comment from './Comment'
import Dropdown from 'react-dropdown'
import { getComments, changeFilter, SORT_OPTIONS, CHANGE_COMMENT_FILTER, commentVote } from '../actions'
import { sort } from '../utils/helpers'

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

  render() {
    const comments = this.props.comments.data || [ ]
    const filter = this.props.comments.filter

    return (
      <Panel header={ this.panelTitle(comments.length) }>
        <Row style={{'marginBottom': '10px'}}>
          <Col sm={2} smOffset={10}>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
