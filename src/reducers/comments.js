import { GET_COMMENTS, CHANGE_FILTER,
  CHANGE_COMMENT_FILTER, 
  UP_VOTES, COMMENT_VOTE,
  COMMENT_MODAL, DELETE_COMMENT,
  UPDATE_COMMENT, EDIT_COMMENT,
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

const updateComment = (state, action) => {
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
    details: initalState.details,
    meta: {
      ...state.meta,
      modalOpen: !state.meta.modalOpen,
      editComment: false
    }
  }
}

const editCommentModal = (state, action) => {
  let comment = state.data.find(_comment => _comment.id === action.payload)

  return {
    ...state,
    details: comment,
    meta: {
      ...state.meta,
      modalOpen: true,
      editComment: action.payload
    }
  }
}

const initalState = {
  loading: false,
  error: false,
  data: [ ],
  details: { },
  filter: UP_VOTES,
  meta: {
    modalOpen: false,
    parentId: undefined,
    editComment: false,
  }
}

const ACTION_HANDLERS = {
  [GET_COMMENTS]: getComments,
  [CHANGE_COMMENT_FILTER]: changeFilter,
  [CHANGE_FILTER]: changeFilter,
  [COMMENT_VOTE]: updateComment,
  [COMMENT_MODAL]: toggleModal,
  [DELETE_COMMENT]: updateComment,
  [UPDATE_COMMENT]: updateComment,
  [EDIT_COMMENT]: editCommentModal,
}

export default function comments(state = initalState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
