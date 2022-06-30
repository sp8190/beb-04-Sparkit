import Seed from 'mnemonic-seed-js'
import { web3 } from '../server'

export type Wallet = {
  privateKey: string
  publicKey: string
  mnemonic: string
}

export async function generateWallet(reqPassword: string): Promise<Wallet> {
  const seed = Seed.new({ passphrase: reqPassword })

  const mnemonic = seed.mnemonic.toString() //mnemonic 문자열생성
  const privateKey = '0x' + seed.privatekey.toString('hex') //private key 생성하는부분
  const publicKey = web3.eth.accounts.privateKeyToAccount(privateKey).address // 지갑address생성

  return {
    privateKey,
    publicKey,
    mnemonic,
  }
}