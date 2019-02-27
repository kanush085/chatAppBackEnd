const userService = require('../services/userServices')
const util = require('../util/token')
const sentMail = require('../middleware/nodemailer')
const exp=require('express-validator')
exports.registration = (req, res) => {
    var responseResult = {};
    userService.registration(req.body, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)

        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult)
        }
    })

}
exports.login = (req, res) => {
    try {
        var responseResult = {};
        userService.login(req.body, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                console.log("Login is working fine");
                console.log("result", result, responseResult);
                res.status(200).send(responseResult);
            }
        })
    } catch (error) {
        res.send(error)

    }
}
exports.forgotpassword = (req, res) => {
    var responseResult = {};
    userService.getUserEmail(req.body, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)

        }
        else {
            responseResult.success = true;
            responseResult.result = result;

            const payload = {
                user_id: responseResult.result._id
            }
            console.log("payload==>",payload);
            const obj = util.generateToken(payload)
            console.log("controller obj", obj);

            const url = `http://localhost:3000/Resetpassword/${obj.token}`;
        
            console.log("url in contoller==>",url);

            sentMail.sendEMailFunction(url)
            res.status(200).send(url)
        }
    })
}
exports.sendResponse = (req, res) => {
    var responseResult = {};
    console.log('in user ctrl send token is verified response');
    userService.redirect(req.decoded, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            console.log('in user ctrl token is verified giving response');
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}
exports.resetPassword = (req, res) => {
    var responseResult = {};
    userService.resetPassword(req, (err, result) => {

        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            console.log("In user control token generated and response is given");
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult)
        }
    })
}
exports.getAllUser = (req, res) => {
    var responseResult = {};
    userService.getAllUser((err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}
