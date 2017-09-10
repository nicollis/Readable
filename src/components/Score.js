import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'
import GoHeart from 'react-icons/lib/go/heart'
import GoFlame from 'react-icons/lib/go/flame'

Score.propTypes = {
  upVote: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  downVote: PropTypes.func.isRequired
}

function Score({upVote, score, downVote, style}) {
  return (
    <Col xs={1} className="text-center vcenter" style={style}>
      <Row>
        <GoHeart/>
      </Row>
      <Row>
        {score}
      </Row>
      <Row>
        <GoFlame/>
      </Row>
    </Col>
  )
}

export default Score
