
const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

let uri = `${process.env.AUTH_DOMAIN}/.well-known/jwks.json`;

const client = jwksClient({
    jwksUri: uri
});

function getKey(header, cb) {
    client.getSigningKey(header.kid, function (err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        cb(null, signingKey);
    });
}

const options = {
    audience: process.env.AUTH_CLIENT_ID,
    issuer: `${process.env.AUTH_DOMAIN}/`,
    algorithms: ['RS256']
};

module.exports = ({req}) => {
    console.log(req.headers);
    console.log(req.headers.authorization);
    const user = new Promise((resolve, reject) => {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (authHeader && authHeader.split('Bearer ')[1] != undefined) {
            token = authHeader.split('Bearer ')[1]
            jwt.verify(token, getKey, options, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        } else {
            return reject(new Error("Token Not Found"));
        }
    });
    return { user };
}

