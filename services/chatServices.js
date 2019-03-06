/************************************************************
 * @description
 * 
 * @file        :   chatServices.js
 * @overview    :   To call chatMOdel as request on service.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   05-03-2019
 * 
 * **********************************************************/
const chatModel = require('../model/chatModel');

/***********addMessage****************
 * @description:Passing the data to model to store the data in db.
 * @param:request and callback function.
 */
exports.addMessage = (req, callBack) => {
    console.log("Request on chat service");
    chatModel.addMessage(req, (err, data) => {
        if (err) {
            callBack("Error on service file : " + err);
        } else {
            console.log("Data on service file : ", data);
            callBack(null, data);
        }
    })
}
/***********getUserMsg****************
 * @description:Passing the data to model to store the data in db.
 * @param:request and callback function.
 */
exports.getUserMsg = (req, callBack) => {
    chatModel.getUserMsg(req, (err, data) => {
        if (err) {
            console.log("chat services is not working");
            callBack(err);
        } else {
            console.log("Chat service is working");
            callBack(null, data);
        }
    })
}
