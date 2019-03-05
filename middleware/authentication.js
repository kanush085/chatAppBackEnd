/************************************************************
 * 
 * Purpose      :   To validate and verify the token.
 * 
 * @description
 * 
 * @file        :   authentication.js
 * @overview    :   To validate and control the functionality.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   05-03-2019
 * 
 * **********************************************************/
const jwt = require('jsonwebtoken')

var secretkey = "adcgfft";
exports.auth = (req, res, next) => {
    var token1 = req.headers['token'];
    if (token1) {
        jwt.verify(token1, secretkey, (err, decoded) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.send({
            success: false,
            message: 'No token provided.'
        });
    }
}