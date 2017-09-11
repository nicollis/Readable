import { GET_COMMENTS, CHANGE_FILTER,
  CHANGE_COMMENT_FILTER, 
  UP_VOTES, COMMENT_VOTE,
  COMMENT_MODAL,
} from '../actions'

const getComments = (state, action) => {
  const comments = action.payload || state.data
  const post_id = (action.params && action.params.post_id) || state.meta.parentId
  
  return {
    ...state,
    data: comments,
    loading: action.loading,
    error: action.error,
    meta: {
      ...state.meta,
      parentId: post_id
    }
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

const toggleModal = (state, action) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      modalOpen: !state.meta.modalOpen 
    }
  }
}

const initalState = {
  loading: false,
  error: false,
  data: [ ],
  filter: UP_VOTES,
  details: { },
  meta: {
    modalOpen: false,
    parentId: undefined,
  }
}

const ACTION_HANDLERS = {
  [GET_COMMENTS]: getComments,
  [CHANGE_COMMENT_FILTER]: changeFilter,
  [CHANGE_FILTER]: changeFilter,
  [COMMENT_VOTE]: commentVote,
  [COMMENT_MODAL]: toggleModal,
}

export default function comments(state = initalState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
