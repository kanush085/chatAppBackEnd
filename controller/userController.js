/************************************************************
 * 
 * Purpose      :   To validate and control the functionality.
 * 
 * @description
 * 
 * @file        :   userController.js
 * @overview    :   To validate and and passing the control to the service.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   05-03-2019
 * 
 * **********************************************************/
const userService = require('../services/userServices')
const util = require('../util/token')
const jwt = require('jsonwebtoken')
const sentMail = require('../middleware/nodemailer')
const exp = require('express-validator')
/***********registration****************
 * @description:To validate the user inputs using express validator and 
 *              send the request body to service controller.
 * @param:request and response.
 */
exports.registration = (req, res) => {
    console.log("inside register");
    req.checkBody('firstname', 'Firstname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('lastname', 'Lastname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 });
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {

        userService.registration(req.body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            }
            else {
                return res.status(200).send({
                    message: result
                });
            }
        })
    }
}
/***********login****************
 * @description:Take the user req and validate the email-id and password and 
 *              send the request body to service controller.
 * @param:request and response.
 */
exports.login = (req, res) => {
    try {
        console.log("req in controller", req.body);
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'password is not valid').isLength({ min: 4 });
        console.log("----------------------");

        var secret = "adcgfft";
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        }
        else {
            // var obj = { email: req.body.email, password: req.body.password }
            userService.login(req.body, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        message: err
                    });
                }
                else {
                    var token = jwt.sign({ email: req.body.email, id: result[0]._id }, secret, { expiresIn: 86400000 });
                    return res.status(200).send({
                        message: result,
                        "token": token
                    });
                }
            })
        }
    } catch (error) {
        res.send(error)

    }
}
/***********forgotpassword****************
 * @description:Take the user req and validate the email-id 
 *              send the request body to service controller if the result is true generate the token
 *              using jwt.
 * @param:request and response.
 */
exports.forgotpassword = (req, res) => {
    req.checkBody('email', 'Email is not valid').isEmail();
    var secret = "adcgfft";
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    }
    else {
        userService.getUserEmail(req.body, (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                });
            }
            else {
                response.success = true;
                response.result = result;

                const payload = {
                    user_id: response.result._id
                }
                console.log("payload==>", payload);
                const obj = util.generateToken(payload)
                console.log("controller obj", obj);

                const url = `http://localhost:3000/Resetpassword/${obj.token}`;

                console.log("url in contoller==>", url);

                sentMail.sendEMailFunction(url)
                res.status(200).send(url)
            }
        })
    }
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
/***********resetPassword****************
 * @description:Take the user req and validate the password and update the password to
 *              the specified email-id.
 *           
 * @param:request and response.
 */
exports.resetPassword = (req, res) => {
    console.log("inside forgotPassword");
    req.checkBody('password', 'password is not valid').isLength({ min: 4 }).equals(req.body.confirmPassword);
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    }
    else {
        userService.resetPassword(req.body, (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                });
            }
            else {
                console.log("In user control token generated and response is given");
                console.log(err);
                return res.status(200).send({
                    message: result
                });
            }
        })
    }
}
/***********getAllUser****************
 * @description:Take the user req and paas the control to service to  get alluser 
 *              from the database.         
 * @param:request and response.
 */
exports.getAllUser = (req, res) => {
    userService.getAllUser(req, (err, result) => {
        var responseResult = {};
        if (err) {
            return callback(err);
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}
