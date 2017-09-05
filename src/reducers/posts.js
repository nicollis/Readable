import { GET_POSTS } from '../actions'

const getPosts = (state, action) => {
  const posts = action.payload || state.data

  return {
    ...state,
    data: posts,
    loading: action.loading,
    error: action.error
  }
}

const initalState = {
  loading: false,
  error: false,
  data: [  ]
}

const ACTION_HANDLERS = {
  [GET_POSTS]: getPosts,
}

export default function posts(state = initalState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
