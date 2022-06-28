export function verifyAccessToken(access_token:string):Boolean {
    try {
        const jwt = require('jsonwebtoken')
        const decodedToken = jwt.verify(access_token, process.env.ACCESS_SECRET)
        if(!decodedToken) {
            return false
        }
    }catch(e) {
        return false
    }
    return true
}