// Followed: https://medium.com/@tharun267/authentication-and-authorization-using-node-js-717d94ecc84d

const jwt = require("jsonwebtoken");
const config = require('./config');

export const getToken = payload => {
    const token = jwt.sign(payload, config.secret);
    return token;
}

export const getPayload = token => {
    if (token != `Bearer ${""}`)
    {
        try {
            const payload = jwt.verify(token, config.secret);
            // console.log("payload HERE", payload);
            return { loggedIn: true, payload };
        } catch (err) {
            // console.log(err);
            return { loggedIn: false }
        }
    }
    return { loggedIn: false }
}
