export function handleHttpResponse (dispatch, constant, response, params) {
  dispatch({ type: constant, loading: true })

  return response.then((res) => {
    dispatch({
      loading: false,
      type: constant,
      payload: res.body,
      params: params
    })
    return res.body
  }).catch((err) => {
    dispatch({
      loading: false,
      error: true,
      type: constant,
      payload: err,
      params: params
    })
    return err
  })
}
