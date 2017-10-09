const Setup = require('../setup');

describe('db/db', () => {

  describe('endpoint method', () => {
    it('should return correct database endpoint', () => {
      Setup.db().endpoint().should.equal(process.env.MONGODB_TEST)
    })
  })

})
