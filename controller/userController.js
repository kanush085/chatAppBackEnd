const userService = require('../services/userServices')
const util = require('../util/token')
const sentMail = require('../middleware/nodemailer')
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
            console.log(payload);
            const obj = util.generateToken(payload)
            console.log("controller obj", obj);

            const url = ""

            sentMail.sendMailFunction(url)
            res.status(200).send(url)
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
