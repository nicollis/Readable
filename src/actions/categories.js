import CategoriesAPI from '../api/categories'
import { handleHttpResponse } from '../utils/handle-http-response'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories() {
  return(dispatch) => {
    return handleHttpResponse(dispatch, GET_CATEGORIES, CategoriesAPI.index())
  }
}
