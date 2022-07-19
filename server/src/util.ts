// Followed: https://medium.com/@tharun267/authentication-and-authorization-using-node-js-717d94ecc84d

const jwt = require("jsonwebtoken");
const config = require('./config');
// const bcrypt = require("bcryptjs")

// export const encryptPassword = password => new Promise((resolve, reject) => {
// 	bcrypt.genSalt(10, (err, salt) => {
// 		if (err) {
// 			reject(err)
// 			return false
// 		}
// 		bcrypt.hash(password, salt, (err, hash) => {
// 			if (err) {
// 				reject(err)
// 				return false
// 			}
// 			resolve(hash)
// 			return true
// 		})
// 	})
// })

// export const comparePassword = (password, hash) => new Promise(async (resolve, reject) => {
// 	try {
// 		const isMatch = await bcrypt.compare(password, hash)
// 		resolve(isMatch)
// 		return true
// 	} catch (err) {
// 		reject(err)
// 		return false
// 	}
// })

export const getToken = payload => {
    const token = jwt.sign(payload, config.secret);
    return token;
}

export const getPayload = token => {
    try {
        const payload = jwt.verify(token, config.secret);
        console.log("here", payload);
        return { loggedIn: true, payload };
    } catch (err) {
        // Add Err Message
        console.log(err);
        return { loggedIn: false }
    }
}
