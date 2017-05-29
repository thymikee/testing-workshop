/* eslint no-unused-vars: 0, import/no-unresolved: 0 */
// WORKSHOP_START
// Let's make sure that users can login to the app!
//
// Here's a high level overview of what to do...
// 1. Create a fake user object with an email and password
// 2. Bring in axios (which will actually be our mock)
//    and mock the post implementation with
//    mockImplementation on the instance
//    (you can get it from axiosMock.__mock.instance.post)
//    You'll want to simulate the response that our backend
//    is giving for the login route. Find that in:
//    /api/src/routes/api/users.js
//    The /api/src/models/user.js file will also be helpful.
// 3. Render the Login form with blank state
// 4. Find the email and password fields and set their
//    node values to the values for your mocked user.
// 5. Simulate a submit on the rendered form
// 6. Use `flushAllPromises` from utils to force all
//    promises to resolve
// 7. Assert that post was called only once on the
//    axios instance and assert that it was called
//    correctly
// 8. Assert that localStorage was called once and
//    was called correctly.
//
// Remember that there are some helpers you can
// get to render the <Login /> with predefined state.
// WORKSHOP_END
// FINAL_START
import axiosMock from 'axios'
// FINAL_END
import Login from '../../src/screens/login'
// FINAL_START
import {renderApp, sel, flushAllPromises} from './helpers/utils'

test('logs in when the form is submitted', async () => {
  const setItemMock = jest.spyOn(window.localStorage, 'setItem')
  const token = 'Luke, I am your father'
  const user = {password: 'my-password', email: 'me@example.com'}
  axiosMock.post.mockImplementation(() => {
    return Promise.resolve({data: {user: {token}}})
  })

  const {history, wrapper} = renderApp({route: '/login'})
  wrapper.find(sel('email')).node.value = user.email
  wrapper.find(sel('password')).node.value = user.password
  wrapper.find('form').simulate('submit')
  await flushAllPromises()
  expect(axiosMock.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.post).toHaveBeenCalledWith('/users/login', {
    user,
  })
  expect(history.location.pathname).toBe('/')
  expect(setItemMock).toHaveBeenCalledTimes(1)
  expect(setItemMock).toHaveBeenCalledWith('jwt', token)
  setItemMock.mockRestore()
})
// FINAL_END
