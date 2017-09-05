import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'

export * from './categories'
export * from './posts'

export default combineReducers({
  categories,
  posts,
})
