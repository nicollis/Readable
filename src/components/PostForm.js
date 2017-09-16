import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Button } from 'react-bootstrap'
import { capitalize, uuid } from '../utils/helpers'
import FieldGroup from './FieldGroup'
import { postPost, getPost, updatePost } from '../actions'

class PostForm extends Component {

  handleSubmit = (event) => {
    const { title, body, author, category } = event.target
    const id = this.props.match.params.post_id || uuid()
    event.preventDefault()
    
    if (this.props.match.params.post_id === 'new') {
        this.props.postPost({
          id: id,
          timestampe: Date.now,
          title: title.value,
          body: body.value,
          author: author.value,
          category: category.value,
        })
    } else {
      this.props.updatePost(this.props.posts.details.id, {
        title: title.value,
        body: body.value,
      })
    }
    
    window.location = `/${category.value}/${id}`
  }

  componentDidMount() {
   const id = this.props.match.params.post_id || 'new'
    if (id !== 'new')
      this.props.getPost(id)
  }


  render() {
    const categories = this.props.categories.data.categories || []
    const path_category = this.props.match.params.category || undefined
    const path_post = this.props.match.params.post_id || undefined
    const is_editing = path_post !== 'new'
    const { title, body, author } = this.props.posts.details
    const is_loaded= title !== undefined && is_editing

    return (
      <Col>
        <h3>{ is_editing ? 'Edit' : 'Add' } Post</h3>
        <form onSubmit={this.handleSubmit.bind(this)} >
          <FieldGroup key={is_loaded ? title : 'title' } id='title' type='text' label='Title' placeholder='My Title' defaultValue={title}/>
          <FieldGroup key={is_loaded ? body : 'body' } id='body' componentClass='textarea' label='Post' placeholder='post' defaultValue={body}/>
          <FieldGroup key={is_loaded ? author : 'author' } id='author' type='text' label='Author' placeholder='username' defaultValue={author} disabled={is_editing}/>
          <FieldGroup id='category' componentClass='select' label='Category' name='category' disabled={is_editing}>
            { categories.map(category=>(<option key={category.path} value={category.path} selected={path_category === category.path}>
              {capitalize(category.name)}</option>)) }
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
  getPost,
  updatePost,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
