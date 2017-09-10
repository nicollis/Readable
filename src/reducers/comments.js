import { GET_COMMENTS, CHANGE_FILTER,
  CHANGE_COMMENT_FILTER, 
  UP_VOTES, COMMENT_VOTE, 
} from '../actions'

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

const commentVote = (state, action) => {
  let comment = action.payload || { }
  let comments = state.data.filter(_comment => _comment.id !== comment.id)
  if (action.payload && !action.error) {
    comments.push(comment)
  }

  return {
    ...state,
    loading: action.loading,
    error: action.error,
    data: comments
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
  [COMMENT_VOTE]: commentVote,
}

export default function comments(state = initalState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
