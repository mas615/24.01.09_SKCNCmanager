//JWT체크, JWT레벨체크, PW해시함수

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SKCNCMAJUNYOUNG';
const HASHSALT = 'MAJUNYOUNG'

function encpassword(pass){  
    const crypto = require('crypto');
    pass = crypto.createHash('sha256')
                      .update(pass)
                      .digest('hex');
    pass = crypto.createHash('sha256')
                      .update(pass+HASHSALT)
                      .digest('hex');
    return pass
}

function verifyJWT(req, res, next) {
    const token = req.cookies.auth;

    if (!token) {
        return res.redirect('/');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.redirect('/');
        }

        req.user = decoded;
        next();
    });
};

function verifyJWTlevel(requiredLevel) {
    return (req, res, next) => {
        const token = req.cookies.auth;
      
        if (!token) {
            return res.redirect('/');
        }
      
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.redirect('/');
            }
            if (decoded.level < requiredLevel) {
                return res.redirect('/');
            }
      
            req.user = decoded;
            next();
        });
    };
}

function verify(a, c){
    jwt.verify(a,SECRET_KEY,c);
}

function sign(a, c){
    return jwt.sign(a,SECRET_KEY,c)
}


module.exports = {encpassword, verifyJWT, verifyJWTlevel, verify, sign};