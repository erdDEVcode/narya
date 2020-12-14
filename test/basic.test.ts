import { WALLETS, getChildProcess, start, stop } from '../'

require('./utils')

describe('Basic tests', () => {
  afterEach(async () => {
    if (getChildProcess()) {
      await stop()
    }
  })

  describe('WALLETS', () => {
    test('is set', async () => {
      expect(WALLETS.alice.bech32).toBeDefined()
      expect(WALLETS.bob.bech32).toBeDefined()
      expect(WALLETS.carol.bech32).toBeDefined()
      expect(WALLETS.dan.bech32).toBeDefined()
      expect(WALLETS.eve.bech32).toBeDefined()
      expect(WALLETS.frank.bech32).toBeDefined()
      expect(WALLETS.grace.bech32).toBeDefined()
      expect(WALLETS.heidi.bech32).toBeDefined()
      expect(WALLETS.ivan.bech32).toBeDefined()
      expect(WALLETS.judy.bech32).toBeDefined()
      expect(WALLETS.mallory.bech32).toBeDefined()
      expect(WALLETS.mike.bech32).toBeDefined()
    })
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
