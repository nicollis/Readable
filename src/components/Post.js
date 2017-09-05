import React from 'react'
import { Well, Row, Col, Label } from 'react-bootstrap'
import GoHeart from 'react-icons/lib/go/heart'
import GoFlame from 'react-icons/lib/go/flame'
import moment from 'moment'

export default function Post({data, onUpvote, onDownvote}) {
  const { timestamp, title, author, category, voteScore } = data
  return (
   <Well>
    <Col xs={1} className="text-center vcenter">
      <Row>
        <GoHeart/>
      </Row>
      <Row>
        {voteScore}
      </Row>
      <Row>
        <GoFlame/>
      </Row>
    </Col>
    <Col xs={9} className='vcenter'>
      <div style={{fontSize: '30px'}}>{title}</div>
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
