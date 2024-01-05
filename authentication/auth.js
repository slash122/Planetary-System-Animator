const jwt = require('jsonwebtoken');
const User = require('../models/User');

function requireAuth(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'KURWA KURWA JA PIERDOLE', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/signin');
            }
            else {
                console.log(decodedToken);
                next();
            }
        }); 
    }
    else {
        res.redirect('/signin');
    }
}

function checkUser(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'KURWA KURWA JA PIERDOLE', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
}

async function  _checkUser(req) {
    const token = req.cookies.jwt;

    if (token) {
        decodedToken = jwt.verify(token, 'KURWA KURWA JA PIERDOLE')
        try {
            const decodedToken =  jwt.verify(token, 'KURWA KURWA JA PIERDOLE');
            const user = await User.findById(decodedToken.id);
            return user;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
    return null;
}

module.exports = {requireAuth, checkUser, _checkUser};