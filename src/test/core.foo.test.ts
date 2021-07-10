import * as foo from '../core/foo'

describe('Test foo core', () => {
  describe('Pagination function', () => {
    it('Should paginate the array', () => {
      const arr = ['one', 2, 'three', 'four', 5]
      const page = 1
      const size = 10
      const res = foo.paginate(arr, page, size)
      console.log(res.length)
    })
  })
})
