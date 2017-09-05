import { GET_CATEGORIES } from '../actions'

const getCategories = (state, action) => {
  const categories = action.payload || state.data

  return {
    ...state,
    data: categories,
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
  [GET_CATEGORIES]: getCategories,
}

export default function categories(state = initalState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
