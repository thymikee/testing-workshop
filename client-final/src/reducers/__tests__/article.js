import article from '../article'

test('ARTICLE_PAGE_LOADED', () => {
  const initialState = {}
  const articleData = {title: 'Mighty Mouse'}
  const comments = [1, 2, 3]
  const action = {
    type: 'ARTICLE_PAGE_LOADED',
    payload: [{article: articleData}, {comments}],
  }
  const result = article(initialState, action)
  expect(result).toEqual({
    article: articleData,
    comments,
  })
})

test('ARTICLE_PAGE_UNLOADED', () => {
  const initialState = {}
  const action = {type: 'ARTICLE_PAGE_UNLOADED'}
  const result = article(initialState, action)
  expect(result).toEqual({})
})

test('ADD_COMMENT', () => {
  const initialState = {comments: [1, 2, 3]}
  const action = {type: 'ADD_COMMENT', payload: {comment: 4}}
  const result = article(initialState, action)
  expect(result).toEqual({
    commentErrors: null,
    comments: [1, 2, 3, 4],
  })
})

test('non-matching type', () => {
  const initialState = {randomThing: 'blah'}
  const action = {type: 'random_action'}
  const result = article(initialState, action)
  expect(result).toEqual(initialState)
})
