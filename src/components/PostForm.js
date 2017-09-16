import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Button } from 'react-bootstrap'
import { capitalize, uuid } from '../utils/helpers'
import FieldGroup from './FieldGroup'
import { postPost } from '../actions'

class PostForm extends Component {

  handleSubmit = (event) => {
    const { title, body, author, category } = event.target
    
    this.props.postPost({
      id: uuid(),
      timestampe: Date.now,
      title: title.value,
      body: body.value,
      author: author.value,
      category: category.value,
    })
    event.preventDefault()
  }

  componentDidUpdate() {
    const {id, category} = this.props.posts.details
    if (id !== undefined && category !== undefined)
      window.location = `/${category}/${id}`
  }

  render() {
    const categories = this.props.categories.data.categories || []
    return (
      <Col>
        <h3>Add Post</h3>
        <form onSubmit={this.handleSubmit} >
          <FieldGroup id='title' type='text' label='Title' placeholder='My Title'/>
          <FieldGroup id='body' componentClass='textarea' label='Post' placeholder='post' />
          <FieldGroup id='author' type='text' label='Author' placeholder='username' />
          <FieldGroup id='category' componentClass='select' label='Category' name='category' >
            { categories.map(category=>(<option key={category.path} value={category.path}>{capitalize(category.name)}</option>)) }
          </FieldGroup>
          <Button type='submit'>Submit</Button>
        </form>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  const { posts, categories } = state

  return {
    posts,
    categories
  }
}

const mapDispatchToProps = {
  postPost, 
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
