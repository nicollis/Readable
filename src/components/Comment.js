import React from 'react'
import { Well, Row, Col, Button } from 'react-bootstrap'
import Score from './Score'
import moment from 'moment'
import GoTrashcan from 'react-icons/lib/go/trashcan'
import GoPencil from 'react-icons/lib/go/pencil'

export default function Comment({data, onVote, onDelete, onEdit}) {
  const { timestamp, body, author, voteScore, id } = data
  return (
   <Well bsSize={"sm"} >
    <Score score={voteScore} upVote={onVote}  />
    <Col xs={9} className='vcenter'>
      <div style={{fontSize: '15px'}}>{body}</div>
    </Col>
    <Col xs={2} className='text-right vcenter'>
      <Row>
       <Button onClick={()=>onEdit(id)} bsSize='xsmall' bsStyle='warning' style={{marginRight: '5px'}}><GoPencil /></Button> 
       <Button onClick={()=>onDelete(id)} bsSize='xsmall' bsStyle='danger' ><GoTrashcan /></Button> 
      </Row>
      <Row>
        {author}
      </Row>
      <Row>
        { moment(timestamp).format('MMM Do YY, h:mm a') }
      </Row>
    </Col>
   </Well> 
  )
}
