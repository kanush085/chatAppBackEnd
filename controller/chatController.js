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
const chatServices = require('../services/chatServices')
module.exports.message = (req, res) => {
    try {
        chatServices.addMessage(req, (err, data) => {
            if (err) {
                res(err);
            }
            else {
                console.log("controller is working fine");
                res(null, data);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}
module.exports.getUserMsg = (req, res) => {
    try {
        console.log("Entered control");
        chatServices.getUserMsg(req, (err, data) => {
            var response = {};
            if (err) {
                response.success = false;
                response.error = err;
                return res.status(500).send(response);
            }
            else {
                response.success = true;
                response.result = data;
                return res.status(200).send(response);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}