import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Button } from 'react-bootstrap'
import GoHeart from 'react-icons/lib/go/heart'
import GoFlame from 'react-icons/lib/go/flame'

Score.propTypes = {
  upVote: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
}

function Score({upVote, score, style}) {
  return (
    <Col xs={1} className="text-center vcenter" style={style}>
      <Row>
        <Button bsStyle="success" bsSize="xsmall" onClick={()=>upVote(true)}><GoHeart/></Button>
      </Row>
      <Row>
        {score}
      </Row>
      <Row>
        <Button bsStyle="danger" bsSize="xsmall" onClick={()=>upVote(false)}><GoFlame/></Button>
      </Row>
    </Col>
  )
}

export default Score
