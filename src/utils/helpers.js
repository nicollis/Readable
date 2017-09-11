import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function sort(sortTarget) {
  return function(firstValue, sectionValue) {
    return firstValue[sortTarget] < sectionValue[sortTarget]
  }
}

export const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      { help && (<HelpBlock>{help}</HelpBlock>) }
    </FormGroup>
  )
}

export const uuid = require('uuid/v1')
