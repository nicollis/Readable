import { GET_COMMENTS, CHANGE_FILTER, CHANGE_COMMENT_FILTER, UP_VOTES } from '../actions'

const getComments = (state, action) => {
  const comments = action.payload || state.data
  
  return {
    ...state,
    data: comments,
    loading: action.loading,
    error: action.error
  }
}

const changeFilter = (state, action) => {
  return {
    ...state,
    filter: action.filter
  }
}

const initalState = {
  loading: false,
  error: false,
  data: [ ],
  filter: UP_VOTES,
}

const ACTION_HANDLERS = {
  [GET_COMMENTS]: getComments,
  [CHANGE_COMMENT_FILTER]: changeFilter,
  [CHANGE_FILTER]: changeFilter,
}

export default function comments(state = initalState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
