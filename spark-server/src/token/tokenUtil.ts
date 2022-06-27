import Web3 from "web3"
import { SITokenABI } from './SITokenABI'
import userModel from "../models/user.model";

const TOKEN_CONTRACT_ADDRESS='0xeF6D0665aF50237Ee41228937F470a5a33382f44'
const TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS='0x3dD51a69aA684EC7CbE2CC2C075311aA872C7A4B'
const VOTING_TOKEN_AMOUNT=1
const INCENTIVE_TOKEN_AMOUNT=3
const GAS_FEE=100000

require('dotenv').config()

declare var process : {
    env: {
        INFURA_ENDPOINT: string,
        SPARK_IT_TOKEN_ACCOUNT_SECRET_KEY: string
    }
}

export async function getUserBalance(userAccount:String) {
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT)); 
    const contract = new web3.eth.Contract(SITokenABI, TOKEN_CONTRACT_ADDRESS, { from: TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, gas: GAS_FEE});
    return await contract.methods.balanceOf(userAccount).call()
}

export async function sendTokenToWriter(writerAccount:String, writerUserId:Number){
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT)); 
    const contract = new web3.eth.Contract(SITokenABI, TOKEN_CONTRACT_ADDRESS, { from: TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, gas: GAS_FEE});
    web3.eth.accounts.wallet.add(process.env.SPARK_IT_TOKEN_ACCOUNT_SECRET_KEY);
    await contract.methods.transfer(writerAccount, INCENTIVE_TOKEN_AMOUNT).send({from: TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, gas: GAS_FEE});
    updateUserBalance(writerUserId, writerAccount)

}

export async function voteToOtherUser(senderAccount:String, senderPrivateKey:String, senderUserId:Number, receiverAccount:String, receiverUserId:Number) {
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT)); 
    const contract = new web3.eth.Contract(SITokenABI, TOKEN_CONTRACT_ADDRESS, { from: TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, gas: GAS_FEE});
    web3.eth.accounts.wallet.add(senderPrivateKey);
    await contract.methods.transfer(receiverAccount, VOTING_TOKEN_AMOUNT).send({from: senderAccount, gas: GAS_FEE});
    updateUserBalance(senderUserId, senderAccount)
    updateUserBalance(receiverUserId, receiverAccount)
}

async function updateUserBalance(userId:Number, userAccount:String) {
    let currentBalance = await getUserBalance(userAccount)
    await userModel.update({balance: currentBalance}, {where: {id: userId}})
}

