import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Dropdown from 'react-dropdown'
import Post from './Post'
import { getPosts, changeFilter, SORT_OPTIONS, CHANGE_POST_FILTER } from '../actions'
import { sort } from '../utils/helpers'

class PostList extends Component {
  constructor() {
    super()
    this.reorderList = this.reorderList.bind(this)
  }

  componentDidMount() {
    this.props.getPosts(this.props.match.params.category)
  }

  reorderList = (sort) => {
    this.props.changeFilter(sort, CHANGE_POST_FILTER)
  }
  
  render() {
    const posts_list = this.props.posts.data || [ ]
    const filter = this.props.posts.filter

    return(
      <Col>
        <Row style={{'marginBottom': '10px'}}>
          <Col sm={2} smOffset={10}>
            <Dropdown className='' options={SORT_OPTIONS} onChange={this.reorderList} value={ filter } placeholder="Sort Post"/>
          </Col>
        </Row>
        <Row>
          { posts_list.filter(p=>!p.deleted).sort(sort(filter.sortColumn)).map(post => (<Post key={post.id} data={post}/>)) }
        </Row>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  const { posts, } = state

  return {
    posts,
  }
}

const mapDispatchToProps = {
  getPosts, 
  changeFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
