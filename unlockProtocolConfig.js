const unlockProtocolConfig = {
    network: 4, // Network ID (1 is for mainnet, 4 for rinkeby... etc)
    locks: {
      '0x7CF9C9E5287E800EFF6d9586E3489170bbCc0C43': {}, 
    },
    icon: 'https://app.unlock-protocol.com/static/images/svg/default.svg', 
    callToAction: {
      default: 'This content is locked. Pay with cryptocurrency to access it!',
      expired: 'This is what is shown when the user had a key which is now expired',
      pending: 'This is the message shown when the user sent a transaction to purchase a key which has not be confirmed yet',
      confirmed: 'This is the message shown when the user has a confirmed key',
      noWallet: 'This is the message shown when the user does not have a crypto wallet which is required...',
    },
    referrer: '0x6059f64BE7BE8E0fbFDD9Be67845572e0e6A77CD' // Address of the referrer who will earn UDT governance tokens if the transaction is elligible.
  }


  module.exports = unlockProtocolConfig
