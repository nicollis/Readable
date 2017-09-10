import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Col } from 'react-bootstrap'
import Comment from './Comment'
import { getComments } from '../actions'

class CommentList extends Component {
  
  componentDidMount() {
    const { post_id } = this.props.match.params
    this.props.getComments(post_id)
  }

  panelTitle = (
    <h3>Comments</h3>
  )

  render() {
    const comments = this.props.comments.data || [ ]
    return (
      <Panel header={ this.panelTitle }>
        { comments.map(comment => ( <Comment key={comment.id} data={comment}/> )) }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
