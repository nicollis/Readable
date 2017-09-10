import { 
  GET_POSTS, GET_POST, 
  CHANGE_FILTER, CHANGE_POST_FILTER, 
  UP_VOTES, GET_COMMENTS
} from '../actions'

const getPosts = (state, action) => {
  const posts = action.payload || state.data

  return {
    ...state,
    data: posts,
    loading: action.loading,
    error: action.error
  }
}

const getPost = (state, action) => {
  const post = action.payload || state.details

  return {
    ...state,
    details: post,
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

const countComments = ( state, action ) => {
  if (action.loading || action.error) {
    return { ...state }
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      [action.params.post_id]: { comment_count: action.payload.length }
    }
  }
}

const initalState = {
  loading: false,
  error: false,
  data: [  ],
  details: {  },
  filter: UP_VOTES,
  meta: { }
}

const ACTION_HANDLERS = {
  [GET_POSTS]: getPosts,
  [GET_POST]: getPost,
  [CHANGE_POST_FILTER]: changeFilter,
  [CHANGE_FILTER]: changeFilter,
  [GET_COMMENTS]: countComments,
}

export default function posts(state = initalState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
