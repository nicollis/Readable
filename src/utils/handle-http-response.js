export function handleHttpResponse (dispatch, constant, response) {
  dispatch({ type: constant, loading: true })

  return response.then((res) => {
    dispatch({
      loading: false,
      type: constant,
      payload: res.body,
    })
    return res.body
  }).catch((err) => {
    dispatch({
      loading: false,
      error: true,
      type: constant,
      payload: err
    })
    return err
  })
}
