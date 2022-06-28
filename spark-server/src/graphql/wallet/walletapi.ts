const lightwallet = require('eth-lightwallet')

export default async (reqPassword: string) => {
  let mnemonic: any
  mnemonic = lightwallet.keystore.generateRandomSeed()
  // 생성된 니모닉코드와 password로 keyStore, address 생성
  return lightwallet.keystore.createVault(
    {
      password: reqPassword,
      seedPhrase: mnemonic,
      hdPathString: "m/0'/0'/0'",
    },
    function (err: any, ks: any) {
      ks.keyFromPassword(reqPassword, function (err: any, pwDerivedKey: any) {
        ks.generateNewAddress(pwDerivedKey, 1)

        let address = ks.getAddresses().toString()
        return { address, privateKey: mnemonic }
      })
    },
  )
}
