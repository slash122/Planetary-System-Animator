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


module.exports = {requireAuth, checkUser};