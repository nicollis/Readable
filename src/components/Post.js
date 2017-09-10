import React from 'react'
import { Well, Row, Col, Label } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Score from './Score'
import moment from 'moment'

export default function Post({data, onUpvote, onDownvote}) {
  const { timestamp, title, author, category, voteScore, id } = data
  return (
   <Well>
    <Score score={voteScore} upVote={onUpvote} downVote={onDownvote} />
    <Col xs={9} className='vcenter'>
      <div style={{fontSize: '30px'}}><Link to={`/${category}/${id}`} >{title}</ Link></div>
    </Col>
    <Col xs={2} className='text-right vcenter'>
      <Row>
        {author} | <Label>{category}</Label>
      </Row>
      <Row>
        { moment(timestamp).fromNow() }
      </Row>
    </Col>
   </Well> 
  )
}
