import Seed from 'mnemonic-seed-js'
import { web3 } from '../../server'

export type Wallet = {
  privateKey: string
  publicKey: string
  mnemonic: string
}

export default {
  generateWallet: async function (reqPassword: string): Promise<Wallet> {
    const seed = Seed.new({ passphrase: reqPassword })

    const mnemonic = seed.mnemonic.toString()
    const privateKey = '0x' + seed.privatekey.toString('hex')
    const publicKey = web3.eth.accounts.privateKeyToAccount(privateKey).address

    return {
      privateKey,
      publicKey,
      mnemonic,
    }
  },
}
