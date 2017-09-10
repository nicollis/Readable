import { GET_COMMENTS } from '../actions'

const getComments = (state, action) => {
  const comments = action.payload || state.data
  
  return {
    ...state,
    data: comments,
    loading: action.loading,
    error: action.error
  }
}

const initalState = {
  loading: false,
  error: false,
  data: [ ],
}

const ACTION_HANDLERS = {
  [GET_COMMENTS]: getComments,
}

export default function comments(state = initalState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
