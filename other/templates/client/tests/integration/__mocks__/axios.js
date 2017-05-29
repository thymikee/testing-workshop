// FINAL_START
const defaultResponse = {data: {}}

module.exports = {
  get: jest.fn(() => Promise.resolve(defaultResponse)),
  put: jest.fn(() => Promise.resolve(defaultResponse)),
  post: jest.fn(() => Promise.resolve(defaultResponse)),
  delete: jest.fn(() => Promise.resolve(defaultResponse)),
  defaults: {headers: {common: {}}},
  create() {
    return this
  },
}
// FINAL_END
