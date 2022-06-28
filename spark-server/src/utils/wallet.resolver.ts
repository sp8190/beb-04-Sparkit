import walletapi from './walletapi'

const express = require('express')
const router = express.Router()
const { users } = require('../models')

router.post('/users', async (req, res) => {
  // 포스트맨에서 usersName, password를 넣으면
  let reqEmail, reqPassword
  reqEmail = req.body.email
  reqPassword = req.body.password

  // users에서 find로 email을 찾고,
  users
    .findOrCreate({
      where: {
        email: reqEmail,
      },
      default: {
        password: reqPassword,
      },
    })
    .then(([users, created]) => {
      if (!created) {
        // 있으면 있다고 응답
        res.status(409).send('users exists')
        // 없으면 DB에 저장
      } else {
        // 니모닉코드 생성
        walletapi
          .generateWallet(reqPassword)
          .then(({ publicKey, privateKey }) => {
            console.log(publicKey, privateKey, '콘솔')
            users
              .update(
                {
                  password: reqPassword,
                  publicKey,
                  privateKey,
                },
                {
                  where: {
                    usersEmail: reqEmail,
                  },
                },
              )
              .then((result) => {
                // 주소를 보여준다
                res.json(publicKey)
              })
              .catch((err) => {
                console.error(err)
              })
          })
      }
    })
})
