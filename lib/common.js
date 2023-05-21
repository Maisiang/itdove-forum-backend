const crypto = require('crypto');

// 亂數產生 JWT SecretKey
const secretKey = crypto.randomBytes(64).toString('hex');

// 加鹽複雜性
const saltRounds = 10;

module.exports = {
    secretKey,
    saltRounds
}