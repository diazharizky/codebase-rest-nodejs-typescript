import chai from 'chai'
import * as foo from '../core/foo'

const expect = chai.expect

describe('Test foo core', () => {
  describe('Pagination function', () => {
    it('Should paginate the array given', () => {
      const arr = ['one', 2, 'three', 'four', 5]
      const page = 1
      const size = 3
      const res = foo.paginate(arr, page, size)
      expect(res.length).to.be.equal(size)
    })
  })

  describe('Get entries function', () => {
    it('Should return array of entries', async () => {
      const page = 1
      const size = 5
      const res = await foo.default.getEntries(page, size)
      expect(res).to.be.an('array')
      expect(res.length).to.be.equal(size)
    })
  })
})
