import walletapi from './walletapi'

const express = require('express')
const router = express.Router()
const Web3 = require('web3')
const { checkRegisterValidation } = require('../middlewares')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const bcrypt = require('bcrypt')
const { users } = require('../models')

var jwt = require('jsonwebtoken')

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
        walletapi(reqPassword).then(({ address, privateKey }) => {
          users
            .update(
              {
                password: reqPassword,
                address,
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
              res.json(address)
            })
            .catch((err) => {
              console.error(err)
            })
        })
      }
    })
})
