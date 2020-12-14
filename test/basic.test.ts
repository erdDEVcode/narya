import { getChildProcess, start, stop } from '../'

require('./utils')

describe('Basic tests', () => {
  afterEach(async () => {
    if (getChildProcess()) {
      await stop()
    }
  })

  describe('start()', () => {
    test('starts a network', async () => {
      expect(getChildProcess()).toBeUndefined()

      await start().should.be.fulfilled

      expect(getChildProcess()).toBeDefined()
    })

    test('can only be called once', async () => {
      await start()
      await start().should.be.rejectedWith('Already started')
    })
  })

  describe('stop()', () => {
    test('stops a network', async () => {
      await start()
      await stop()
      expect(getChildProcess()).toBeUndefined()
    })

    test('unless not running', async () => {
      await stop().should.be.rejectedWith('Not started')
    })
  })
})
