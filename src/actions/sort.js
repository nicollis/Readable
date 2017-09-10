export const CHANGE_FILTER = 'CHANGE_FILTER'
export const CHANGE_POST_FILTER = 'CHANGE_POST_FILTER'
export const CHANGE_COMMENT_FILTER = 'CHANGE_COMMENT_FILTER'

/* Filter Sort Options */
export const UP_VOTES = { value: 'UP_VOTES', label: 'Up Votes', sortColumn: 'voteScore' }
export const NEWEST = { value: 'NEWEST', label: 'Newest', sortColumn: 'timestamp' }

export const SORT_OPTIONS = [
  UP_VOTES,
  NEWEST,
]

export function changeFilter(sort, target_store = CHANGE_FILTER) {
  const filter = SORT_OPTIONS.find(x => x.value === sort.value) || UP_VOTES
  return ({
    type: target_store,
    filter: filter
  })
}
