import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Col, Row } from 'react-bootstrap'
import Comment from './Comment'
import Dropdown from 'react-dropdown'
import { getComments, changeFilter, SORT_OPTIONS, CHANGE_COMMENT_FILTER } from '../actions'
import { sort } from '../utils/helpers'

class CommentList extends Component {
  
  componentDidMount() {
    const { post_id } = this.props.match.params
    this.props.getComments(post_id)
  }

  panelTitle = (
    <h3>Comments</h3>
  )

  reorderList = (sort) => {
    this.props.changeFilter(sort, CHANGE_COMMENT_FILTER)
  }

  render() {
    const comments = this.props.comments.data || [ ]
    const filter = this.props.comments.filter

    return (
      <Panel header={ this.panelTitle }>
        <Row style={{'marginBottom': '10px'}}>
          <Col sm={2} smOffset={10}>
            <Dropdown className='' options={SORT_OPTIONS} onChange={this.reorderList} value={ filter } placeholder="Sort Post"/>
          </Col>
        </Row>
        { comments.sort(sort(filter.sortColumn)).map(comment => ( <Comment key={comment.id} data={comment}/> )) }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
